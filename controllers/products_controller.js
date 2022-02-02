//контроллеры оправили в репозиторий
const Products = require('../repository/products')

const getProducts = async (req, res, next) => {
    try {
        const userId = req.user._id
        const data = await Products.listProducts(userId, req.query)
        res
        .status(200)
        .json({
            status: 'success', 
            code: 200, 
            data: {...data}})
    } catch (error) {
        next(error)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const userId = req.user._id
        const product = await Products.getProductById(req.params.productId, userId)
        if(product){
            return res
            .status(200)
            .json({
                status: 'success', 
                code: 200, 
                data: {product}})
        }
        return res
        .status(404)
        .json({
            status: 'error', 
            code: 404, 
            message: 'Not found'})

    } catch (error) {
        next(error)
    }
}

const saveProduct = async (req, res, next) => {
    try {
        const userId = req.user._id
        const product = await Products.addProduct({...req.body, owner: userId})
        res
        .status(201)
        .json({
            status: 'success', 
            code: 201, 
            data: {product}})
    } catch (error) {
        next(error)
    }
}

const removeProduct = async (req, res, next) => {
    try {
        const userId = req.user._id
        const product = await Products.removeProduct(req.params.productId, userId)
        if(product){
            return res
            .status(200)
            .json({
                status: 'success', 
                code: 200, 
                data: {product}})
        }
        return res
        .status(404)
        .json({
            status: 'error', 
            code: 404, 
            message: 'Not found'})

    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const userId = req.user._id
        const product = await Products.updateProduct(req.params.productId, req.body, userId)
        if(product){
            return res
            .status(200)
            .json({
                status: 'success', 
                code: 200, 
                data: {product}})
        }
        return res
        .status(404)
        .json({
            status: 'error', 
            code: 404, 
            message: 'Not found'})

    } catch (error) {
        next(error)
    }
}

const updateDualsim = async (req, res, next) => {
    try {
        const userId = req.user._id
        const product = await Products.updateProduct(req.params.productId, req.body, userId)
        if(product){
            return res
            .status(200)
            .json({
                status: 'success', 
                code: 200, 
                data: {product}})
        }
        return res
        .status(404)
        .json({status: 'error', code: 404, message: 'Not found'})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    removeProduct,
    updateProduct,
    updateDualsim,
}