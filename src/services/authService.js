export function isAdmin(user) {
  return user?.permissions?.includes("Admin") || false;
}
