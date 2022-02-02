//контроллеры оправили в репозиторий
const Products = require('../repository/products')
const {CustomError} = require('../helpers/customError')

const getProducts = async (req, res) => {
        const userId = req.user._id
        const data = await Products.listProducts(userId, req.query)
        res
        .status(200)
        .json({
            status: 'success', 
            code: 200, 
            data: {...data}})
}

const getProduct = async (req, res) => {
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
    throw new CustomError(404, 'Not Found')
}

const saveProduct = async (req, res) => {
        const userId = req.user._id
        const product = await Products.addProduct({...req.body, owner: userId})
        res
        .status(201)
        .json({
            status: 'success', 
            code: 201, 
            data: {product}})
}

const removeProduct = async (req, res) => {
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
    throw new CustomError(404, 'Not Found')
}

const updateProduct = async (req, res) => {
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
    throw new CustomError(404, 'Not Found')
}

const updateDualsim = async (req, res) => {
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
    throw new CustomError(404, 'Not Found')
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    removeProduct,
    updateProduct,
    updateDualsim,
}