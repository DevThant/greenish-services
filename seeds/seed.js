const { Service, Request } = require("../models/request");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/greenish-services-hvac")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

// const addDS = async (id) => {
//   const service = await Service.findById(id);
//   const nVariant = {
//     dvName: "Hotel",
//     dvPrice: 300000,
//     dvDescription: "Install Daikin M-50 for your hotel",
//     dvModel: "inverter",
//     dvBrand: "Daikin",
//     dvHp: 2.5,
//   };

//   service.defaultVariants.push(nVariant);
//   const res = await service.save();
//   console.log(res);

//   // const variant = service.defaultVariants.push([{}]);

//   // const res = await variant.save();
//   // console.log(res);

//   // console.log(service);
// };

// addDS("6266a6654874ff75fc9d511e");

// const makeService = async () => {
//   // await Service.deleteMany({});
//   const service = new Service({
//     name: "Installation",
//     price: 20000,
//     description: "Complete installation of an AC of your choice",
//     variants: [
//       {
//         vname: "Daikin m21-31",
//         vprice: 120000,
//         vdescription: "Installation of Daikin m21-31",
//         model: "inverter",
//         brand: "Daikin",
//         hp: 1.5,
//       },
//       {
//         vname: "Panasonic",
//         vprice: 140000,
//         vdescription: "Installation of Panasonic LLp2",
//         model: "non-inverter",
//         brand: "Panasonic",
//         hp: 1.5,
//       },
//       {
//         vname: "Media",
//         vprice: 100000,
//         vdescription: "Installation of Media 3313",
//         model: "inverter",
//         brand: "Media",
//         hp: 2,
//       },
//     ],
//     defaultVariants: [
//       {
//         dvName: "Apartments",
//         dvPrice: 120000,
//         dvDescription: "Daikin m21-31 for apartments",
//         dvModel: "inverter",
//         dvBrand: "Daikin",
//         dvHp: 1.5,
//       },
//       {
//         dvName: "Condominiums & Houses",
//         dvPrice: 140000,
//         dvDescription: "Panasonic for house & condominiums",
//         dvModel: "non-inverter",
//         dvBrand: "Panasonic",
//         dvHp: 1.5,
//       },
//       {
//         dvName: "Offices",
//         dvPrice: 100000,
//         dvDescription: "Media 3313 for offcies",
//         dvModel: "inverter",
//         dvBrand: "Media",
//         dvHp: 2,
//       },
//     ],
//   });
//   const res = await service.save();
//   console.log(res);
// };

// makeService();
