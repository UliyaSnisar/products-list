const db = require('./db')
const {ObjectId} = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listProducts = async () => {
  const collection = await getCollection(db, 'product_list')
  const results = await collection.find({}).toArray()
    return results
  }
  
  const getProductById = async (productId) => {
    const collection = await getCollection(db, 'product_list')
    const oid = new ObjectId(productId)
    const [result] = await collection.find({_id: oid}).toArray()
    return result
  }
  
  const removeProduct = async (productId) => {
    const collection = await getCollection(db, 'product_list')
    const oid = new ObjectId(productId)
    const {value: result} = await collection.findOneAndDelete({_id: oid})
    return result
  }
  
  const addProduct = async (body) => {
      const newProduct = {
          hasDualsim: false,
          ...body,
      }
      const collection = await getCollection(db, 'product_list')
      const result = await collection.insertOne(newProduct)
      return await getProductById(result.insertedId)
  }
  
  const updateProduct = async (productId, body) => {
    const collection = await getCollection(db, 'product_list')
    const oid = new ObjectId(productId)
    const {value: result} = await collection.findOneAndUpdate(
      {_id: oid}, 
      {$set: body},
      { returnDocument: 'after' },
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