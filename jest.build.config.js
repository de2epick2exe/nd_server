/** @type {import('ts-jest').JestConfigWithTsJest} **/
console.log("Jest config loaded successfully!");
module.exports = {  
  roots: ["<rootDir>/dist/"],
  testEnvironment: "node",  
  testMatch:["**/api_tests.js"]
};