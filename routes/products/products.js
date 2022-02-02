//роутеры пробросили на контроллеры
const express = require('express')
const router = express.Router()
const {   
    getProducts,
    getProduct,
    removeProduct,
    saveProduct,
    updateProduct,
    updateDualsim,} = require('../../controllers/products_controller')
const { validateProduct, validateId} = require('./validation')
const guard = require('../../helpers/guard')

router.get('/', guard, getProducts)

router.get('/:productId', guard, validateId, getProduct)

router.delete('/:productId', guard, validateId, removeProduct)

router.post('/', guard, validateProduct, saveProduct)

router.put('/:productId', guard, [validateId, validateProduct], updateProduct)

router.patch('/:productId/dualsim', guard, validateId, updateDualsim)

module.exports = router;