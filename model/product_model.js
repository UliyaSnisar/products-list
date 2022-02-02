//репозиторий пришел сюда в модель и взял данные
const mongoose = require('mongoose')
const {Schema, model, SchemaTypes} = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new Schema({
    weight: {
        type: Number,
        required: true,
        message: 'Set weidth of product',
    },
    color: {
        type: String,
        required: true,
        message: 'Set color of product',
    },
    price: {
        type: Number,
        required: true,
        message: 'Set price of product',
    },
    owner:{
        type: SchemaTypes.ObjectId,
        ref: 'user',
    }
  },
  {
      discriminatorKey: 'type'
  }, {
    versionKey: false, 
    timestamps: true, 
    toJSON: {
        virtuals: true, 
        trasnform: function(doc, ret) {
        delete ret._id
        return ret
    }},
    toObject: {virtuals: true},
});

productSchema.plugin(mongoosePaginate)

const Product = mongoose.model('Product', productSchema)

const phoneSchema= new Schema({
    producttype: {
        type: String
    },
    hasDualsim: {
        type: Boolean,
        required: true,
    },
})
const Phone = Product.discriminator('Phone', phoneSchema)

const tabletSchema= new Schema({
    producttype: {
        type: String
    },
})
const Tablet = Product.discriminator('Tablet', tabletSchema)

const notebookSchema= new Schema({
    producttype: {
        type: String
    },
    videoCard: {
        type: String,
        required: true,
        message: 'Enter video card information'
    },
})
const Notebook = Product.discriminator('Notebook', notebookSchema)

module.exports = {Product, Phone, Tablet, Notebook}
