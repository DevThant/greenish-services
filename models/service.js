const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
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
  choices: {
    type: Schema.Types.ObjectId,
    ref: "Choice",
  },
  exInstallations: {
    type: Schema.Types.ObjectId,
    ref: "ExInstallation",
  },
});

serviceSchema.post("findOneAndDelete", async function (service) {
  if (service.choices.length || service.exChoices.length) {
  }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
