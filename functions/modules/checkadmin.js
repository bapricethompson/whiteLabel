const admin = require("firebase-admin");

async function checkAdminPermission(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (
      decodedToken.permissions &&
      Array.isArray(decodedToken.permissions) &&
      decodedToken.permissions.includes("Admin")
    ) {
      req.user = decodedToken;
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin permission required" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

module.exports = checkAdminPermission;
