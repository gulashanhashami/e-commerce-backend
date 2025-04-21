import express from "express";
import cors from "cors";
import connect_db from "./configs/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
app.use(express.json());

const corsOPtions = {
    origin: "*",
    credential: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOPtions));

app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

const port = process.env.PORT;

app.listen(port, async () => {
    try {
        await connect_db();
        console.log(`Listening on port: ${port}`)
    } catch (err) {
        console.log("Error: ", err.message);
    }
})
