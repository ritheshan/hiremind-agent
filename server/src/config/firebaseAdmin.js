const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let serviceAccount;
console.log("Secrets directory:", fs.existsSync("/etc/secrets"));
console.log("Secret files:", fs.existsSync("/etc/secrets/firebase-service-account-credentials.json"));

if (process.env.NODE_ENV === "production") {
  // ✅ Render Secret File location
  serviceAccount = JSON.parse(
    fs.readFileSync(
      "/etc/secrets/firebase-service-account-credentials.json",
      "utf8"
    )
  );
} else {
  // ✅ Local development file (gitignored)
  serviceAccount = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../etc/secrets/firebase-service-account-credentials.json"),
      "utf8"
    )
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;