const { Service, Request } = require("../models/request");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationDemo")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const makeService = async () => {
  const service = new Service({
    name: "testing",
    price: 10000,
    description: "Surveying and quotation for custom requirements",
    variants: [
      {
        vname: "test1",
        vprice: 0,
        vdescription: "Survey waiting time, 3-5 days",
      },
      {
        vname: "test2",
        vprice: 10000,
        vdescription: "Survey waiting time, 1 day",
      },
    ],
  });
  const res = await service.save();
  console.log(res);
};

makeService();
