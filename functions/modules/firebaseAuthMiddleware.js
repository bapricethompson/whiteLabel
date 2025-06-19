const admin = require("firebase-admin");

const authenticateFirebaseToken = async (req, res, next) => {
  try {
    console.log("authenticateFirebaseToken");
    const auth = admin.auth();

    const headerToken = req.header("Authorization");
    console.log("header", headerToken);
    if (!headerToken || !headerToken.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const idToken = headerToken.split(" ")[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // Includes custom claims like permissions
    console.log("Decoded token:", decodedToken);

    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(403).json({ error: "Forbidden", message: error.message });
  }
};

module.exports = authenticateFirebaseToken;
