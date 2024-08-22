import User from "./userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { config } from "../config/config.js";

//register
const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username && !password)
    return res.status().json({ message: "fill all field" });

  const user = await User.findOne({ email });

  if (user)
    return res
      .status(409)
      .json({ message: "Email already exits, Try with another Email id !!!!" });

  try {
    //hashing the password berfor storing
    const hashPassword = await bcrypt.hash(password, 10);
    //db call for saving register data
    const newUser = await User.create({
      email,
      username,
      password: hashPassword,
    });

    //generating the JWT Token in response
    const accessToken = JWT.sign({ sub: newUser._id }, config.jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    console.log(config.jwtSectet);
    res.status(200).json(accessToken);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured the saving the data" });
  }
};

//login
const loginUser = async (req, res) => {
  //extracting data from body
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(401).json({ message: "username and password required" });

  //username validation
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "Username not found" });

  //password validation
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(404).json({ message: "Username or Password Invalid" });

  //success response
  res
    .status(200)
    .json({ message: "Welcome in ZeroZilla, You are SignIn, now" });
};

export { createUser, loginUser };
