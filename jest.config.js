// jest.config.js
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest", // transform .js/.jsx files using babel-jest
  },
  moduleFileExtensions: ["js", "jsx"],
};
