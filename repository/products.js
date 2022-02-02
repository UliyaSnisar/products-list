//репозиторий  пошел в модель
const Product = require('../model/product_model')

const listProducts = async () => {
  const results = await Product.find({})
    return results
  }
  
  const getProductById = async (productId) => {
    const result = await Product.findById(productId)
    return result
  }
  
  const removeProduct = async (productId) => {
    const result = await Product.findByIdAndRemove({_id: productId})
    return result
  }
  
  const addProduct = async (body) => {
      const result = await Product.create(body)
      return result
  }
  
  const updateProduct = async (productId, body) => {
    const result = await Product.findByIdAndUpdate(
      {_id: productId},
      {...body},
      {new: true},
      )
    return result
  }
  
  module.exports = {
    listProducts,
    getProductById,
    removeProduct,
    addProduct,
    updateProduct,
  }