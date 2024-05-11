export default class CartRespository{
    constructor(dao){
        this.dao = dao
    }

    getCart = async () => {
        return await this.dao.get()
    }

    getCartBy = async (id) => {
        return await this.dao.getBy(id)
    }

    createCart = async () => {
        return await this.dao.create()
    }

    updateCart = async (id, updatedC) => {
        return await this.dao.update(id, updatedC)
    }

    deleteCart = async (id) => {
        return await this.dao.delete(id)
    }

    deleteProductCart = async (cID, pID) => {
        return await this.dao.deleteProductC(cID, pID)
    }

    updateQuantityProductCart = async (cID, pID, quantity) => {
        return await this.dao.updateQuantityProductC(cID, pID, quantity)
    }

    deleteProductsCart = async (cID) => {
        return await this.dao.deleteProductsC(cID);
    }
}