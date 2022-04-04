const jwt = require("jsonwebtoken");





//example
const data = { email: "ngoctrong@gmail.com" };
// jwt.sign(data, "123123", { expiresIn: 120 }, (err, dataToken) => {
//   console.log("data:", dataToken);
// });
// console.log("outside");

const result = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2N0cm9uZ0BnbWFpbC5jb20iLCJpYXQiOjE2NDg2OTk2MDgsImV4cCI6MTY0ODY5OTcyOH0.Awv2zlzXYoDOn0x-hps8_rzyHKEpSJxlWKaai8v4-Vw",
  "123123"
);
console.log("encode: ", result);

/**
 * theory
 * token = header.payload.signnature
 *
 * function: sign(data, pass, {config}, callback) -> data + pass => create token // can set expiresIn in config
 * function: verify(token, pass, callback) -> token + pass => data
 * 
 * can not destroy token
 */
