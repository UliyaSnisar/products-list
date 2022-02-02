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
const wrapError = require('../../helpers/errorHandler')

router.get('/', guard, wrapError(getProducts))

router.get('/:productId', guard, validateId, wrapError(getProduct))

router.delete('/:productId', guard, validateId, wrapError(removeProduct))

router.post('/', guard, validateProduct, wrapError(saveProduct))

router.put('/:productId', guard, [validateId, validateProduct], wrapError(updateProduct))

router.patch('/:productId/dualsim', guard, validateId, wrapError(updateDualsim))

module.exports = router;