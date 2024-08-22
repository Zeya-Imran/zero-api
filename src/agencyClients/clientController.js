import { Agency, Client } from "./clientModel.js";

const createClientAgency = async (req, res) => {
  const { agencyData, clientData } = req.body;
  if (!agencyData || !clientData)
    return res.status(401).json({ message: "data must be send" });

  try {
    const newAgency = await Agency.create(agencyData);

    //adding the agencyId into the  client data;
    clientData.agencyId = newAgency._id;

    const newClient = await Client.create(clientData);

    res.status(201).json({
      Agency: newAgency._id,
      Client: newClient._id,
    });
  } catch (error) {
    console.error("Error creating agency and client:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//top client with maximum total bill
const topClientWithTotalBill = async (req, res) => {
  const agency = await Client.find()
    .sort({ totalBill: -1 })
    .limit(1)
    .populate("agencyId", "name");

  const topClient = {
    AgencyName: agency[0].agencyId.name,
    ClientName: agency[0].name,
    TotalBill: agency[0].totalBill,
  };
  res.status(200).json(topClient);
};

//update the single client details
const updateClientDetails = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    console.log(clientId);

    //checking client is valid or not
    const findClient = await Client.findOne({ _id: clientId });
    if (!findClient) {
      return res.status(401).json({ message: "Client does not exist" });
    }

    if (Object.keys(req.body.clientData).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const { clientData } = req.body;

    //updating the data
    const updatedClient = await Client.findByIdAndUpdate(
      { _id: clientId },
      {
        mobile: clientData.mobile,
        totalBill: clientData.totalBill,
      },
      { new: true },
    );

    res.status(200).json(updatedClient._id);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createClientAgency, topClientWithTotalBill, updateClientDetails };
