const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://letter-editor-app.firebaseio.com",
});

const db = admin.firestore();
module.exports = { admin, db };
