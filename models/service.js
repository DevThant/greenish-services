const mongoose = require("mongoose");
const Choice = require("./choice");
const ExInstallation = require("./exInstallation");
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
  basePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["hvac", "solar", "electrical", "plumbing", "grounding"],
    required: true,
  },
  choices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Choice",
    },
  ],
  exInstallations: [
    {
      type: Schema.Types.ObjectId,
      ref: "ExInstallation",
    },
  ],
});

serviceSchema.post("findOneAndDelete", async function (service) {
  if (service.choices.length) {
    const res = await Choice.deleteMany({ _id: { $in: service.choices } });
    console.log("Default Services Options Deleted", res);
  }
  if (service.exInstallations.length) {
    const res = await ExInstallation.deleteMany({
      _id: { $in: service.exInstallations },
    });
    console.log("Extened Installation Services Deleted", res);
  }
  console.log("Service Deleted");
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
