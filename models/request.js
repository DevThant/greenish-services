const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  variants: [
    {
      vname: String,
      vprice: Number,
      vdescription: String,
    },
  ],
});
const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  service: {
    name: {
      type: String,
      required: true,
    },
    vname: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    variantId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    vprice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  description: String,
  note: String,
  cost: Number,
  requestDate: Date,
  confirm: {
    type: Boolean,
    default: false,
  },
});

module.exports.Service = mongoose.model("Service", serviceSchema);
module.exports.Request = mongoose.model("Request", requestSchema);
// module.exports = mongoose.model("Request", requestSchema);
// const Request = mongoose.model("Request", requestSchema);

// module.exports = [Service, Request];
