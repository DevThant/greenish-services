const mongoose = require("mongoose");
const { Schema } = mongoose;

const exInstallationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  model: {
    type: String,
    enum: ["Inverter", "Non-Inverter"],
  },
  brand: String,
  hp: {
    type: Number,
    enum: [1, 1.5, 2, 2.5, 3, 3.5],
  },
  express: {
    type: Boolean,
    default: false,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
});
const ExInstallation = mongoose.model("ExInstallation", exInstallationSchema);

module.exports = Choice;
// choice: {
//     name: "Regular Cleaning",
//     description: "Cleaning any types of ac using standard equiments in minimal time.",
//     price: 35000,
//     plan: "One-Time",
//     type: "Regular"
// }
// choice: {
//     name: "Apartment",
//     description: "Daikin m23, suitable for apartments, effective up to 10 people",
//     price: 350000,
//     plan: "",
//     type: "",
//     model: "Inverter"
//     brand: "Daikin",
//     hp: 1.5,
// }
