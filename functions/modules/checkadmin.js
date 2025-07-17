const { isAdmin } = require("../../src/services/authService");

function checkAdminPermission(req, res, next) {
  const user = req.user;

  if (!isAdmin(user)) {
    return res.status(401).json({
      error: "Admin permission required to access this route.",
    });
  }

  next();
}

module.exports = checkAdminPermission;
