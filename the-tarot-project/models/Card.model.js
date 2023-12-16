const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
    {
        nameCard: {
            type: String,
            required: true,
        },

        categories: {
            type: String,
        },

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