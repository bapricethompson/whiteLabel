const checkAdminPermission = require("../functions/modules/checkadmin");

describe("checkAdminPermission middleware", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    res.status.mockClear();
    res.json.mockClear();
    next.mockClear();
  });

  it("calls next if user is admin", () => {
    const req = { user: { permissions: ["Admin"] } };
    checkAdminPermission(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("returns 401 if user is not admin", () => {
    const req = { user: { permissions: ["User"] } };
    checkAdminPermission(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Admin permission required to access this route.",
    });
  });

  it("returns 401 if user is missing", () => {
    const req = {};
    checkAdminPermission(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Admin permission required to access this route.",
    });
  });
});
