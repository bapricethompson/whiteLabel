import { toUserObject } from "../src/gateways/authGateway";

describe("toUserObject", () => {
  it("maps API response to internal format", () => {
    const apiResponse = {
      id: "abc123",
      name: "Jane Doe",
      permissions: ["Admin"],
      extraField: "ignore me",
    };

    const expected = {
      id: "abc123",
      name: "Jane Doe",
      permissions: ["Admin"],
    };

    const result = toUserObject(apiResponse);
    expect(result).toEqual(expected);
  });

  it("defaults permissions to empty array if missing", () => {
    const apiResponse = { id: "1", name: "NoPerms" };
    const result = toUserObject(apiResponse);
    expect(result.permissions).toEqual([]);
  });
});
