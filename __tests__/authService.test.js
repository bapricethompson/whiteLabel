import { isAdmin } from "../src/services/authService";

describe("isAdmin", () => {
  it("returns true for user with Admin permission", () => {
    const user = { permissions: ["Admin", "User"] };
    expect(isAdmin(user)).toBe(true);
  });

  it("returns false for user without Admin permission", () => {
    const user = { permissions: ["User"] };
    expect(isAdmin(user)).toBe(false);
  });

  it("returns false if permissions are undefined", () => {
    const user = {};
    expect(isAdmin(user)).toBe(false);
  });
});
