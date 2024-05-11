export default class ProductDto {
    constructor(product){
        this.title = product.title
        this.description = product.description
        this.code = product.code
        this.price = product.price
        this.stock = product.stock
        this.category = product.category
        this.isActive = product.isActive
        this.owner = product.owner
    }
}