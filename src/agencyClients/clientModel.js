import mongoose from "mongoose";
const { Schema } = mongoose;

// Agency schema
const agencySchema = new Schema(
  {
    agencyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    besideAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Client schema
const clientSchema = new Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    totalBill: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// Models
const Agency = mongoose.model("Agency", agencySchema);
const Client = mongoose.model("Client", clientSchema);

export { Agency, Client };
