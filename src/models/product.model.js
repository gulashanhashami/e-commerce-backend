import mongoose, { version } from "mongoose";

const productSchema = mongoose.Schema(
    {
        title: { type: String, require: true },
        image: { type: String, require: true },
        rating: { type: Number, min: 0, max: 5 },
        price: { type: Number, require: true },
        category: { type: String, require: true },
        wishlistedBy: [{ type: String }]

    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default mongoose.model("Product", productSchema);