const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
    {
        numberCard: {
            type: Number,
            required: true,
        },

        nameCard: {
            type: String,
            required: true,
            trim: true,
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