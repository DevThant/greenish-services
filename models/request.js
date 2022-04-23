const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  service: {
    name: {
      type: String,
      enum: ["s1", "s2", "s3", "s4", "s5"],
    },
  },
});
