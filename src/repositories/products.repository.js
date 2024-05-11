import productDto from '../dtos/product.dto.js'
import { faker } from '@faker-js/faker'


export default class ProductRepository{
    constructor(dao){
        this.dao = dao;
    }

    getProduct = async (limit, page, sort) => {
        return await this.dao.get(limit, page, sort);
    }

    getProductBy = async (id) => {
        return await this.dao.getBy(id)
    }

    createProduct = async (newP) =>{
        newP.code = faker.string.alphanumeric({ length: {min: 3, max: 3} })
        const newProduct = new productDto(newP)
        return await this.dao.create(newProduct)
    }

    updateProduct = async (id, updatedP) => {
        return await this.dao.update(id, updatedP)
    }

    deleteProduct = async (id) => {
        return await this.dao.delete(id)
    }

}