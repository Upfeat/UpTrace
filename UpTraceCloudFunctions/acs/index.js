const Firestore = require('@google-cloud/firestore');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const jwt = require('jsonwebtoken');
const validator = require('@authenio/samlify-node-xmllint');
const saml = require('samlify');

const APP_URL = 'http://localhost:3000'
const SAML_LOGIN_REDIRECT = 'https://accounts.google.com/o/saml2/idp?idpid=C032x590p&SAMLRequest=fZJNj9MwEIb%2FSuS7EyfesBurKeq2WlFpgWpbOHBBxpl0LTl28Ixh%2BfekKfsBEnvwZTzP%2BH2sWaAe3KhWie79HXxPgJQ9DM6jmi9alqJXQaNF5fUAqMio%2Fer9rapyocYYKJjg2AvkdUIjQiQbPMu2m5Z9rXrZNeZSctM1kl%2F0oue6uZC8r2sBtW50KRuWfYaIE9OyacQEIibYeiTtaSqJquRC8lIeKqnEpZJXuXhz9YVlm8nFek0zeU80oioKbUxInjA%2FhnB0kJswFKE4Ba8K241vp2O7di1k9VA3YmTZ7o%2FjtfWd9cfX9b6dm1C9Oxx2fPdxf2DZ6lF5HTymAeIe4g9r4NPd7XOshNyAp6hdyTURDCNVXIqqrkRuXEhdn7w5DcHcA00WyEu2XJxyq%2Fk%2F4vLJ8B88QR5zPY44Bpp1F8VLbHFegA%2BTy3azC86aX9lNiIOm%2F6uWeTlXbMf7uVXBoK1bdV0ExEnZufBzHUETtKzXDoEVy%2FOzf6%2Fa8jc%3D'

saml.setSchemaValidator(validator);

const PROJECTID = 'attempt2-302520';
const COLLECTION_NAME = 'Admins';

const SP_SECRET = 'SecretSP';
const IPD_SECRET = 'SecretIDP';
const AT_SECRET = 'SecretAT';
const RT_SECRET = 'SecretRT';
var sp;
var idp;
var aToken;
var rToken;


const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

const client = new SecretManagerServiceClient();

function getSecretPath(secretName) {
  return `projects/attempt2-302520/secrets/${secretName}/versions/latest`;
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

function createToken(email) {
  return jwt.sign({name: email}, aToken);
}

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

function APIGateway(req, res) {

  const controllerRouter = {
    people() { return require('./Controllers/PeopleController')},
    places() { return require('./Controllers/PeopleController')}
  }

  var actionStr = req.body.action;
  var instructions = actionStr.split('/');
  var controllerName = instructions[0];
  var methodName = instructions[1];
  console.log('INDEX: Person='+JSON.stringify(req.body.data))

  const controller = (controllerRouter[controllerName])();
  
  return ((controller[methodName])(req.body.data))
}

function toJSON(string) {
  return {
          "value": string,
          "valid": true
         }
}

exports.acs1 = async (req, res) => {
  try {

    const corsWhitelist = [
      APP_URL,
      SAML_LOGIN_REDIRECT
    ]
    if(corsWhitelist.indexOf(req.headers.origin) !== -1) {

    }
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(authenticateToken(req)) {
      //Case 1: JWT Valid
      res.send(toJSON(APIGateway(req,res)));
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

