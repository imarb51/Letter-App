const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require(path.join(__dirname, "config/firebase-admin.json")); // ✅ Correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://letter-editor-app-1589d.firebaseio.com",
});

const db = admin.firestore();
module.exports = { db };
