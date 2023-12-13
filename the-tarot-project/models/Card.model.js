const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
    {
        nameCard:{
            type: String,
            },   

        categories: {
             type: String,
             },

        starSign: { 
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