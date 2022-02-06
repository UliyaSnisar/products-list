//репозиторий  пошел в модель
const {Product, Phone, Tablet, Notebook} = require('../model/product_model')


const listProducts = async (userId, query) => {
  // const results = await Product.find({owner: userId}).populate({
  //   path: 'owner', 
  //   select: 'name email'
  // })
  const {
    sortBy, 
    sortByDesc, 
    limit = 5, 
    page = 1,
  } = query
  const searchOptions = {owner: userId}
  const results = await Product.paginate(searchOptions, {
    limit, 
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1} : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1} : {}),
    }, 
    populate: {
        path: 'owner', 
        select: 'name email'
      },
  })
  const {docs: products} = results
  delete results.docs
    return {...results, products}
  }
  
  const getProductById = async (productId, userId) => {
    const result = await Product.findOne({_id: productId, owner: userId}).populate({
      path: 'owner', 
      select: 'name email'
    })
    return result
  }
  
  const removeProduct = async (productId, userId) => {
    const result = await Product.findOneAndRemove({_id: productId, owner: userId})
    return result
  }
  
  const addProduct = async (body) => {
    console.log(body);
    const productType = body.producttype
    if(productType === 'phone'){
      return await Phone.create(body)
    }
    if(productType === 'tablet'){
      return await Tablet.create(body)
    }
    if(productType === 'notebook'){
      return await Notebook.create(body)
    }
  }
  
  const updateProduct = async (productId, body, userId) => {
    const result = await Product.findOneAndUpdate(
      {_id: productId, owner: userId},
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