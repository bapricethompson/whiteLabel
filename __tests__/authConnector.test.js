const { fetchSelfUser } = require("../src/connectors/authConnector");

// Mock fetch globally
global.fetch = jest.fn();

describe("fetchSelfUser", () => {
  const token = "valid-token";
  const serverURL = "https://example.com";

  beforeEach(() => {
    fetch.mockClear();
  });

  it("returns user data if response is ok", async () => {
    const mockUser = { id: "123", name: "Test User" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const result = await fetchSelfUser(token, serverURL);
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(
      `${serverURL}/users/self`,
      expect.anything()
    );
  });

  it("throws error if response is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(fetchSelfUser(token, serverURL)).rejects.toThrow(
      "Invalid token or failed to fetch user."
    );
  });
});
