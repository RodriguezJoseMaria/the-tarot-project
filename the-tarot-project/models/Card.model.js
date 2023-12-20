const { Schema, model, default: mongoose } = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const cardSchema = new Schema(
    {
        numberCard: {
            type: Number,
            required: true,
        },

        nameCard: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String, slug: "nameCard"
        },

        categories: {
            type: [String, String, String],
        },

        description: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)


const Card = model("Card", cardSchema);

module.exports = Card;