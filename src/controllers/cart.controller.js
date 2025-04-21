import Cart from "../models/cart.model.js";

// function for creating cartf data
export const create = async (req, res, next) => {
    try {
        const cartProduct = await Cart.findOne({ productId: req.body.productId });
        if (cartProduct) {
            return res.status(400).send({ message: "Product is already added by you.", error: true });
        }
        const cartData = await Cart.create(req.body);
        return res.status(201).send(cartData);
    } catch (err) {
        next(err);
    }
}