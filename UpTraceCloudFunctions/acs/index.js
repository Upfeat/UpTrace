const Firestore = require('@google-cloud/firestore');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const jwt = require('jsonwebtoken');
const validator = require('@authenio/samlify-node-xmllint');
const saml = require('samlify');

saml.setSchemaValidator(validator);

const helloController = require('./Controllers/HelloController.js')

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




exports.acs = async (req, res) => {
  try {
    if(authenticateToken(req)) {
      //Case 1: JWT Valid
      console.log("Valid JWT")
 
      res.redirect('https://attempt2-302520.ue.r.appspot.com/');
    } 
    await injectSecrects();

    if(req.body.SAMLResponse){
      //Case 2: SAML Request
      sp.parseLoginResponse(idp,'post',req).then(async parseResult => {
        const userEmail = parseResult.extract.nameID;
        var adminAccount = await getAdminAccount(userEmail);
        if(req.body.SAMLResponse) {
          console.log(JSON.stringify(req.body))
        }
        if (!adminAccount) {
          createAdminAccount(userEmail);
          adminAccount = await getAdminAccount(userEmail);
        }
        const accessToken = jwt.sign({email: adminAccount.email, role: adminAccount.role}, aToken);
        return accessToken;
      }).then((accessToken)=>{
        
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.cookie('JWT', accessToken,{httpOnly: false});
        res.redirect('https://attempt2-302520.ue.r.appspot.com/');
      })
    } else {
        //Case 3: redirect to login
        let uri = sp.createLoginRequest(idp).context;
        res.set('Access-Control-Allow-Origin', "*")
        res.set('Access-Control-Allow-Methods', 'GET, POST', 'HEAD')
        res.send(uri);
    }
  } catch(error) {
    console.log(error)
    res.send(error)
  }
};

