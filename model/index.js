const crypto = require('crypto')
const DB = require('./db')
const db = new DB('./products.json')

const listProducts = async () => {
    return await db.read()
  }
  
  const getProductById = async (productId) => {}
  
  const removeProduct = async (productId) => {}
  
  const addProduct = async (body) => {
      const products = await db.read()
      const newProduct = {
          id: crypto.randomUUID(),
          hasDualsim: false,
          ...body,
      }
      products.push(newProduct)
      await db.write(products)
      return newProduct
  }
  
  const updateProduct = async (productId, body) => {
    const products = await db.read()
    const index = cats.findIndex((product) => product.id === productId)
    if(index !== -1){
        products[index] = {...products[index], ...body}
        await db.write(products)
        return products[index]
    }
    return null
  }
  
  module.exports = {
    listProducts,
    getProductById,
    removeProduct,
    addProduct,
    updateProduct,
  }