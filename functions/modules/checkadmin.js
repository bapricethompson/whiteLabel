function checkAdminPermission(req, res, next) {
  console.log("NEW ADMIN");
  const user = req.user;
  if (!user || !user.permissions || !user.permissions.includes("Admin")) {
    return res
      .status(401)
      .json({ error: "Admin permission required to access this route." });
  }
  next();
}

module.exports = checkAdminPermission;
