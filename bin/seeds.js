const parks = require("../data");
const Park = require("../models/Park.model");
const mongoose = require("mongoose");
const DB_NAME = "parkfinder";

mongoose
  .connect(`mongodb://localhost/${DB_NAME}`)
  .then(() => {
    console.log("Connected to database only to create parks information");

    Park.insertMany(parks)
    .then((parks) => {
      console.log(`${parks.length} parks inserted.`);
      
      mongoose.disconnect();
    });
  })
  .catch((error) => console.error(error));
