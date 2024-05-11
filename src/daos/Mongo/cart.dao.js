import cartModel from "../../models/cart.model.js";

export default class cartManagerMongo {
  constructor() {
    this.model = cartModel
  }

  async get() {
    return await this.model.find().lean();
  }

  async getBy(id) {
    return await this.model.findById({ _id: id });
  }

  async create() {
    return await this.model.create({ products: [] });
  }

  async update(id, newCart) {
    return await this.model.findByIdAndUpdate(id, newCart);
  }

  async delete(id) {
    return await this.model.findByIdAndUpdate({ _id: id });
  }

  async deleteProductC(cid, pid) {
    return await this.model.updateOne(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    );
  }

  async updateQuantityProductC(cid, pid, quantity) {
    const cart = await this.model.findById({_id : cid});
    const productIndex = cart.products.findIndex(
      (p) => p.product && p.product.id === pid
    );

    cart.products[productIndex].quantity = quantity;

    return await this.update(cid, cart);
  }

  async deleteProductsC(cid) {
    return await this.model.updateOne({ _id: cid }, { $set: { products: [] } });
  }
}
