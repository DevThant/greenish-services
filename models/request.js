const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  service: {
    type: String,
    enum: [
      "installation",
      "survey",
      "one-time cleaning",
      "yearly contract",
      "repair",
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
