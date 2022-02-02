//репозиторий пришел сюда в модель и взял данные
const { Schema, model } = require('mongoose')
const {productType} = require('../config/constants')

const productSchema = new Schema({
    type: {
        type: String,
        enum: {
            values: [productType.PHONE, productType.TABLET, productType.NOTEBOOK]
        },
        default: productType.PHONE,
    },
    weight: {
        type: Number,
        required: [true, 'Set weidth of product']
    },
    color: {
        type: String,
        required: [true, 'Set color of product']
    },
    price: {
        type: Number,
        required: [true, 'Set price of product']
    },
    hasDualsim: {
        type: Boolean
    },
    videoCard: {
        type: String
    },
},
{
    versionKey: false, 
    timestamps: true, 
    toJSON: {
        virtuals: true, 
        trasnform: function(doc, ret) {
        delete ret._id
        return ret
    }},
    toObject: {virtuals: true}
    }
)

const Product = model('product', productSchema)

module.exports = Product