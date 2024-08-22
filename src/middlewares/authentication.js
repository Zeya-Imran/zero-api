import JWT from "jsonwebtoken";
import { config } from "../config/config.js";

const authentication = (req, res, next) => {
  const headerToken = req.header("Authorization");

  if (!headerToken)
    return res.status(401).json({ message: "Authorization token is required" });

  try {
    const splitToken = headerToken.split(" ")[1];

    const parsedToken = JWT.verify(
      splitToken,
      config.jwtSecret,
      (err, decoded) => {
        if (err)
          return res
            .status(401)
            .json({ message: "Token Expired or not valid token" });
        else next();
      },
    );
  } catch (error) {
    res.status(401).json({ message: "Token Expired" });
  }
};

export default authentication;
