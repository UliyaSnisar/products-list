const express = require('express')
const router = express.Router()
const Products = require('../../model/index')

router.get('/', async (req, res, next) => {
    try {
        const products = await Products.listProducts()
        res.json({status: 'success', code: 200, data: {products}})
    } catch (error) {
        next(error)
    }
})

router.get('/:productsId', async (req, res, next) => {
    res.json({message: 'qwe'})
})

router.post('/', async (req, res, next) => {
    try {
        const product = await Products.addProduct(req.body)
        res.json({status: 'success', code: 201, data: {product}})
    } catch (error) {
        next(error)
    }
})

router.delete('/:productId', () => {
    res.json({message: 'qwe'})
})

router.put('/:productId', async(req, res, next) => {
    try {
        const product = await Products.updateProduct(req.params.productId, req.body)
        if(product){
            return res.status(200).json({status: 'success', code: 200, data: {product}})
        } 
        return res.status(404).json({status: 'error', code: 404, message: 'Not found'})
    } catch (error) {
        next(error)
    }
})

router.patch('/:productId', () => {
    res.json({message: 'qwe'})
})

module.exports = router;