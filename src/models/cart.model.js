import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        price: { type: Number, require: true },
        category: { type: String, require: true },
        image: { type: String, require: true },
        rating: { type: Number, require: true },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
export default mongoose.model("Cart", cartSchema);