export const generateUserErrorInfo = (user) => {
  return `One or more properties where incomplete or not valid.
  List of require properties: 
      * first_name: nedds to be a String, recived ${user.first_name}
      * last_name: nedds to be a String, recived ${user.last_name}
      * email: nedds to be a String, recived ${user.email}   
  `
}

export const routingErrorInfo = (req) => {
  return `The endpoint ${req.originalUrl} does not exist or is inactive.`
}

export const addOwnProduct = () => {
  return 'You cant add your own product to your cart'
}

export const addCartProductErrorInfo = () => {
  return `The product was not added to the cart, try again, if the problem persists, reload the page.`
}

export const databaseErrorInfo = () => {
  return "It's not possible connect with the database. Please reload the page."
}

export const dataProductErrorInfo = (product) => {
  return `One or more properties where incomplete or not valid.
  List of require properties: 
      * title: nedds to be a String, recived ${product.title}
      * description: nedds to be a String, recived ${product.description}
      * price: nedds to be a Number, recived ${product.price},
      * category: nedds to be a String, recived ${product.category}
  `
}
