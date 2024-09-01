// Please don't change the pre-written code
// Import the necessary modules here
import { confirmLogin } from "../features/user/model/user.model.js";
const basicAuthMiddleware = (req, res, next) => {
  // Write your code here
  const header = req.headers["authorization"];
  if (!header) {
    return res
      .status(401)
      .send({ success: "false", message: "no authorization details found" });
  }
  const cred = header.replace("Basic ", "");
  const base64Credential = Buffer.from(cred, "base64").toString("ascii");
  const [email, password] = base64Credential.split(":");
  const data = { email: email, password: password };
  let isValidUser = confirmLogin(data);
  console.log(isValidUser);
  if (isValidUser) {
    next();
  } else {
    return res
      .status(401)
      .send({ success: "false", message: "authorization failed" });
  }
};

export default basicAuthMiddleware;
