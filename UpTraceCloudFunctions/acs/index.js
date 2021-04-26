//NEEDS TO BE CHANGED//////////// 
const APP_URL = 'https://uptraceuofm.uc.r.appspot.com'
const PROJECT_ID = 'uptraceuofm';
/////////////////////////////////

const Firestore = require('@google-cloud/firestore');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const jwt = require('jsonwebtoken');
const validator = require('@authenio/samlify-node-xmllint');
const saml = require('samlify');

saml.setSchemaValidator(validator);

const COLLECTION_NAME = 'Admins';

const SP_SECRET = 'SecretSP';
const IPD_SECRET = 'SecretIDP';
const AT_SECRET = 'SecretAT';
const RT_SECRET = 'SecretRT';
var sp;
var idp;
var aToken;
var rToken; //TODO - will eventually store the refresh token for the JWT 



//SECRET MANAGER FUNCTIONS
const client = new SecretManagerServiceClient();

function getSecretPath(secretName) {
  return `projects/${PROJECT_ID}/secrets/${secretName}/versions/latest`;
}

async function accessSecretVersion(secretPath) {
  const [version] = await client.accessSecretVersion({
    name: secretPath,
  });
  const payload = version.payload.data.toString('utf8');
  return payload;
}

async function injectSecrects() {
  const spMD = await accessSecretVersion(getSecretPath(SP_SECRET));
  sp = saml.ServiceProvider({
    metadata: spMD
  });

  const idpMD = await accessSecretVersion(getSecretPath(IPD_SECRET));
  idp = saml.IdentityProvider({
    metadata: idpMD
  });

  aToken = await accessSecretVersion(getSecretPath(AT_SECRET));
  rToken = await accessSecretVersion(getSecretPath(RT_SECRET));
}
////////////////////////////////////

//FIRESTORE FUNCTIONS
const firestore = new Firestore({
  PROJECT_ID: PROJECT_ID,
  timestampsInSnapshots: true,
});

async function getAdminAccount(userEmail) {
    const userRef = firestore.collection(COLLECTION_NAME).doc(userEmail);
    const doc = await userRef.get();
    return doc.exists
}

function createAdminAccount(userEmail) {
  firestore.collection(COLLECTION_NAME).doc(userEmail).set({
    email:   userEmail,
    role:    "admin"
  });
}
///////////////////////////////////


//AUTHENTICATION FUNCTIONS 
var getCookies = function(req) {
  if(!req.headers.cookie) return null;

  var cookies = {};
  req.headers && req.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};

function authenticateToken(req) {
  var valid = false;
  
  const cookies = getCookies(req)
  if(cookies == null) return valid;

  const token = cookies['JWT'] ;
  console.log("JWT TOKEN: " + token)

  jwt.verify(token,aToken, (err, admin) => {
    if(!err) valid = true;
  })
  return valid;
}
//////////////////////////////////////////

async function APIGateway(req, res) {

  var returnValue;

  const controllerRouter = {
    people() { return require('./Controllers/PeopleController')},
    places() { return require('./Controllers/PlacesController')},
    placeCategory()  { return require('./Controllers/PlaceCategoryController')},
    transportation() { return require('./Controllers/TransportationController')}
  }

  var actionStr = req.body.action;
  console.log("action string = " + actionStr)
  console.log("data: " +req.body.data)
  var instructions = actionStr.split('/');
  var controllerName = instructions[0];
  var methodName = instructions[1];

  const controller = (controllerRouter[controllerName])();
  var controllerReturn;

  if(req.body.data) 
    controllerReturn = (controller[methodName])(req.body.data)
  else 
    controllerReturn = (controller[methodName])()

  if(controllerReturn instanceof Promise) {
    returnValue = await controllerReturn
  }
  else 
    returnValue = controllerReturn
    
  console.log(returnValue)

  return returnValue
}

function toJSON(value) {
  return JSON.stringify({
          "value": value,
          "valid": true
         })
}

exports.acs = async (req, res) => {
  try {

    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(authenticateToken(req)) {
      //Case 1: JWT Valid
      res.send(toJSON(await APIGateway(req,res)));
    } 
    else { 
      await injectSecrects();
      if(req.body.SAMLResponse){
        //Case 2: SAML Request
        sp.parseLoginResponse(idp,'post',req).then(async parseResult => {
          const userEmail = parseResult.extract.nameID;
          var adminAccount = await getAdminAccount(userEmail);
          if (!adminAccount) {
            createAdminAccount(userEmail);
            adminAccount = await getAdminAccount(userEmail);
          }
          const accessToken = jwt.sign({email: adminAccount.email, role: adminAccount.role}, aToken);
          return accessToken;
        }).then((accessToken)=>{
          res.cookie('JWT', accessToken,{sameSite: 'None', secure: true, httpOnly: true});
          res.redirect(APP_URL + "/admin/people");
        })
      } else {
          //Case 3: redirect to login
          let uri = sp.createLoginRequest(idp).context;
          //res.set('Access-Control-Allow-Methods', 'GET, POST', 'HEAD')
          res.send(uri);
        }
      }
  } catch(error) {
    console.log(error)
    res.send(error)
  }
};

