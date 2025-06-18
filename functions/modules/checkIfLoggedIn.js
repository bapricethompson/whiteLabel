const admin = require("firebase-admin");

const checkIfLoggedIn = async (req, res, next) => {
  try {
    console.log("checkIfLoggedIn !!!!!!!!!!!!");
    const auth = admin.auth();
    const headerToken = req.header("Authorization");
    const db = admin.database(); // Initialize database here

    let idToken = "";
    if (headerToken && headerToken.startsWith("Bearer ")) {
      idToken = headerToken.split(" ")[1];
    }

    if (!idToken || idToken === "undefined") {
      req.user = false;
      return next();
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    console.log("PASS");
    return next();
  } catch (error) {
    console.log("AQUI");
    req.user = false;
    return next();
  }
};

module.exports = checkIfLoggedIn;
