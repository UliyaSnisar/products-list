const express = require('express')
const router = express.Router()
const Products = require('../../model/products')
const { validateProduct, validateDualsim, validateId} = require('./validation')

router.get('/', async (req, res, next) => {
    try {
        const products = await Products.listProducts()
        res
        .status(200)
        .json({status: 'success', code: 200, data: {products}})
    } catch (error) {
        next(error)
    }
})

router.get('/:productId', validateId, async (req, res, next) => {
    try {
        const product = await Products.getProductById(req.params.productId)
        if(product){
            return res
            .status(200)
            .json({status: 'success', code: 200, data: {product}})
        }
        return res
        .status(404)
        .json({status: 'error', code: 404, message: 'Not found'})

    } catch (error) {
        next(error)
    }
})


router.delete('/:productId', validateId, async (req, res, next) => {
    try {
        const product = await Products.removeProduct(req.params.productId)
        if(product){
            return res
            .status(200)
            .json({status: 'success', code: 200, data: {product}})
        }
        return res
        .status(404)
        .json({status: 'error', code: 404, message: 'Not found'})

    } catch (error) {
        next(error)
    }
})

router.post('/', validateProduct, async (req, res, next) => {
    try {
        const product = await Products.addProduct(req.body)
        res.status(201).json({status: 'success', code: 201, data: {product}})
    } catch (error) {
        next(error)
    }
})

router.put('/:productId', validateId, validateProduct, async (req, res, next) => {
    try {
        const product = await Products.updateProduct(req.params.productId, req.body)
        if(product){
            return res
            .status(200)
            .json({status: 'success', code: 200, data: {product}})
        }
        return res
        .status(404)
        .json({status: 'error', code: 404, message: 'Not found'})

    } catch (error) {
        next(error)
    }
})

router.patch('/:productId/dualsim', validateId, validateDualsim, async (req, res, next) => {
    try {
        const product = await Products.updateProduct(req.params.productId, req.body)
        if(product){
            return res
            .status(200)
            .json({status: 'success', code: 200, data: {product}})
        }
        return res
        .status(404)
        .json({status: 'error', code: 404, message: 'Not found'})

    } catch (error) {
        next(error)
    }
})

module.exports = router;