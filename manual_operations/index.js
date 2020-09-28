require('dotenv').config()
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin
    .credential
    .cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const auth = admin.auth();

const elevateToAdmin = uid => {
  return auth.setCustomUserClaims(uid, {admin: true}).then(() => {
    console.log('success!');
    process.exit(0);
  }).catch(error => {
    console.log('failed');
    console.log(error);
    process.exit(-1);
  });
}

const elevateToWriter = () => {

}

elevateToAdmin('vRwx0jIuGWXv7R383kwlGs7ljQy2');