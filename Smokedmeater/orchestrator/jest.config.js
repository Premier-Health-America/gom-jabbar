/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testMatch:["**/**/*.test.ts"],
  verbose:true,
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};