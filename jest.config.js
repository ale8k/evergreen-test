const tsJest = require("ts-jest/jest-preset");

module.exports =  {
  ...tsJest,
  globals: {
    name: "Tech test",
    testEnvironment: "node",
    reporters: ["default", "jest-junit"]
  }
};

