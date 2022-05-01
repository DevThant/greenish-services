# greenish-services

This app provides users with the services of Greenish Engineering Co., Ltd.

```json
[
  {
    "_id": "62668a190261fb74afbb2913",
    "name": "Installation",
    "price": 20000,
    "description": "Complete installation of an AC of your choice",
    "variants": [
      {
        "vname": "Daikin",
        "vprice": 120000,
        "vdescription": "The Daikin Brand",
        "_id": "62668a190261fb74afbb2914"
      },
      {
        "vname": "Panasonic",
        "vprice": 140000,
        "vdescription": "The Panasonic Brand",
        "_id": "62668a190261fb74afbb2915"
      },
      {
        "vname": "Media",
        "vprice": 100000,
        "vdescription": "The Media Brand",
        "_id": "62668a190261fb74afbb2916"
      }
    ],
    "__v": 0
  },
  {
    "_id": "62668ba068b68fe697151229",
    "name": "Cleaning",
    "price": 18000,
    "description": "Complete cleaning of your AC",
    "variants": [
      {
        "vname": "Classic",
        "vprice": 0,
        "vdescription": "The usual cleaning wihtout extra equipments",
        "_id": "62668ba068b68fe69715122a"
      },
      {
        "vname": "Premium",
        "vprice": 10000,
        "vdescription": "We use premium cleaning products designed for the AC",
        "_id": "62668ba068b68fe69715122b"
      },
      {
        "vname": "Yearly Classic Subscription",
        "vprice": 22000,
        "vdescription": "Yearly contract for classic",
        "_id": "62668ba068b68fe69715122c"
      },
      {
        "vname": "Yearly Premium Subscription",
        "vprice": 22000,
        "vdescription": "Yearly contract for premium",
        "_id": "62668ba068b68fe69715122d"
      }
    ],
    "__v": 0
  },
  {
    "_id": "62668c510007b842e4a03d3c",
    "name": "Survey",
    "price": 10000,
    "description": "Surveying and quotation for custom requirements",
    "variants": [
      {
        "vname": "Classic Survey",
        "vprice": 0,
        "vdescription": "Survey waiting time, 3-5 days",
        "_id": "62668c510007b842e4a03d3d"
      },
      {
        "vname": "Express",
        "vprice": 10000,
        "vdescription": "Survey waiting time, 1 day",
        "_id": "62668c510007b842e4a03d3e"
      }
    ],
    "__v": 0
  },
  {
    "_id": "62668d4c9314ad331f364f5e",
    "name": "testing",
    "price": 10000,
    "description": "Surveying and quotation for custom requirements",
    "variants": [
      {
        "vname": "test1",
        "vprice": 0,
        "vdescription": "Survey waiting time, 3-5 days",
        "_id": "62668d4c9314ad331f364f5f"
      },
      {
        "vname": "test2",
        "vprice": 10000,
        "vdescription": "Survey waiting time, 1 day",
        "_id": "62668d4c9314ad331f364f60"
      }
    ],
    "__v": 0
  }
]
```

[Horse Power Calculator](https://www.airconditioning-systems.com/air-conditioning-calculations.html#:~:text=When%20choosing%20an%20air%20conditioner,the%20greater%20the%20cooling%20capacity.)

```json

Service:{
  group: {
    type: String,
    enum: ["hvac", "solar"],
    required: true,
  }
  stype:{
    type: String,
    enum: ["Installtion", "Cleaning", "Maintenence", "Survey"],
    required: true,
  }
  hvac:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "Hvac"
  }],
  solar:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "Solar"
  }],
}

Hvac:{
  installtion:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "Installation"
  }],
  cleaning:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "cleaning"
  }],
  maintenance:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "maintenance"
  }],
  survey:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "survey"
  }],
}


Service:{
  stype:{
    type: String,
    enum: ["Installtion", "Cleaning", "Maintenence", "Survey"],
    required: true,
  }
  group: {
    type: String,
    enum: ["hvac", "solar", "electrical", "grounding", "plumbing"],
    required: true,
  }
  description: "",
  basePrice: 1000,
  installtion:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "Installation"
  }],
  cleaning:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "cleaning"
  }],
  maintenance:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "maintenance"
  }],
  survey:[{
    types: mongoose.Schema.Types.ObjectId,
    ref : "survey"
  }],

}


Installation{
  obj: {
    type: String,
    enum: ["ac", "solar"]
    required: true,
  }
   service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  }
}

  // Mutual
  name: {
    type: String,
    required: true,
  },
  brand:{
    type: String,
    required: true,
  },
   price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDefault: {
    type: boolean,
    default: false,
    required: true,

  }

  // for ac
  model: {
    type: String,
    enum: ["Inverter", "Non-Inverter"],
    required: function(){return this.obj === "ac";}
  },
  hp: {
    type: Number,
    enum: [1, 1.5, 2, 2.5, 3, 3.5],
    required: function(){return this.obj === "ac";}
  },
```
