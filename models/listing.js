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
            default: "https://assets.goal.com/images/v3/bltefb34c50efb4bc67/Man%20United%20POTY%202024.jpg?auto=webp&format=pjpg&width=3840&quality=60",
            set: (v) => (v ? v : "https://assets.goal.com/images/v3/bltefb34c50efb4bc67/Man%20United%20POTY%202024.jpg?auto=webp&format=pjpg&width=3840&quality=60"),
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
