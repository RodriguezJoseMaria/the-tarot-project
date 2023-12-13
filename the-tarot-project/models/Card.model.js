const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
    {
        nameofcard:{
            type: String,
            },   
        categories: {
             type: String,
             },

        starsign: { 
            type: String,
            } ,

        description: { 
            type: String
         },
    },
    {
        timestamps: true
    }
)


const Card = model("Card", cardSchema);

module.exports = Card;