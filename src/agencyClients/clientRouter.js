import express from "express";
import {
  createClientAgency,
  topClientWithTotalBill,
  updateClientDetails,
} from "./clientController.js";

const clientRouter = express.Router();

clientRouter.post("/register", createClientAgency);
clientRouter.get("/totalbill", topClientWithTotalBill);
clientRouter.put("/:clientId", updateClientDetails);

export default clientRouter;
