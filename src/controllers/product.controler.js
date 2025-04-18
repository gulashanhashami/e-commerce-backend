import Product from "../models/product.model.js";

// function for creating product data
export const create = async(req, res, next) =>{
    try {
        const product = await Product.create(req.body);
        return res.status(201).send(product);
    } catch (err) {
        next(err);
    }
}

// function for getting product data list
export const list = async(req, res, next)=>{
    try {
        const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    let categoryFilter = {};
    if (req.query.category) {
      const categories = Array.isArray(req.query.category)
        ? req.query.category
        : req.query.category.split(',');
      categoryFilter = { category: { $in: categories } };
    }

    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;
    const priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };

    const sortBy = req.query.sortBy || 'latest';
    let sortOption = {};
    if (sortBy === 'latest') sortOption = { createdAt: -1 };
    else if (sortBy === 'price_asc') sortOption = { price: 1 };
    else if (sortBy === 'price_desc') sortOption = { price: -1 };

    const filters = {
        ...categoryFilter,
        ...priceFilter,
      };

      const total = await Product.countDocuments(filters);
    const products = await Product.find(filters).sort(sortOption).skip((page - 1) * size).limit(size);

    return res.status(200).send({
        products,
        page,
        totalPages: Math.ceil(total / size),
        totalProducts: total,
      });
    } catch (err) {
        next(err);
    }
}


// function for handling wishlist for a perticular user
export const handleWishlist = async(req, res, next)=>{
    const { productId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).send({ error: 'Product not found' });
        }
        const isWishlisted = product.wishlistedBy.includes(userId);
        if(isWishlisted){
            product.wishlistedBy.pull(userId);
            await product.save();
            return res.json({status: "removed"});
        }else{
            product.wishlistedBy.push(userId);
            await product.save();
            return res.json({status: "added"});
        }
        
    } catch (err) {
        console.log("err ", err);
        next(err);
    }
}