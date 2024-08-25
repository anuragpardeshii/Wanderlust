const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

// Define a Mongoose schema for a listing
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        filename: {
            type: String,
            default: '',
        },
        url: {
            type: String,
        },
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    price: {
        type: Number,
        min: 0,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

// Middleware to handle the deletion of associated reviews
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

// Create a Mongoose model for the listing
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
