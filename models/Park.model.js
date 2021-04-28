const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const parkSchema = new Schema({    
    parkName: {type : String },
    description: String,
    images: String,
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: false
        },
        coordinates: {
          type: [Number],
          required: false,
        }
      },
    getThere: String,
    extension: { type: Number },    
    hasFountain: { type: Boolean },    
    hasPlayGround: { type: Boolean },
    hasPublicToilettes: { type: Boolean },
    hasTrees: { type: Boolean },
    allowsDogs: { type: Boolean },
    wifiService: { type: Boolean },    
    openRangeHour: { "type": "array",
                    "maxItems": 2,
                    "items":{
                    "type": "string"
    }},
    district: { type: String, enum: [ "Sants-Montjuïc", "Ciutat Vella", "Sant Martí", "Eixample", "Sarrià-Sant Gervasi", "Nou Barris", "Les Corts", "Horta-Guinardó", "Gràcia" ] },
    hasSkateZone: { type: Boolean }}, 
    {
  timestamps: true
});

const Park = mongoose.model("Park", parkSchema);
module.exports = Park;