const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schemaProduct = Joi.object(
    {
        producttype: Joi.string(),
        weight: Joi.number().integer().required(),
        color: Joi.string().required(),
        price: Joi.number().required(),
        hasDualsim: Joi.boolean().optional(),
        videoCard: Joi.string().optional(),
    }
)

const schemaId = Joi.object({
    productId: Joi.objectId().required()
})

const validate = async (schema, obj, res, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    }
    catch (err) {
        console.log(err)
        res
        .status(400)
        .json({
            status: 'error', 
            code: 400, 
            message: `Field ${err.message}`
        })
    }
}

module.exports.validateProduct = async (req, res, next) => {
    return await validate(schemaProduct, req.body, res, next)
}

module.exports.validateId = async (req, res, next) => {
    return await validate(schemaId, req.params, res, next)
}