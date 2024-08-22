import express from "express";
import bodyParser from "body-parser";
import clientRouter from "./agencyClients/clientRouter.js";
import userRouter from "./authentication/userRouter.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome in API" });
});

//middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/v1/client-agency", clientRouter);
app.use("/api/v1/top-client", clientRouter);
app.use("/api/v1/client", clientRouter);

app.use("/api/v1/token-based", userRouter);

export default app;
