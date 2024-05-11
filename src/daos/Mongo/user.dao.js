import userModel from "../../models/user.model.js";

export default class UserDaoMongo {
  constructor() {
    this.userModel = userModel;
  }

  async get(filters) {
    return await this.userModel.find(filters).lean();
  }

  async getBy(id) {
    return await this.userModel.findById({ _id: id }).lean();
  }

  async getOne(filters) {
    return await this.userModel.findOne(filters).lean();
  }

  async create(newU) {
    return await this.userModel.create(newU);
  }

  async update(id, updatedUser) {
    return await this.userModel.findByIdAndUpdate({ _id: id }, updatedUser);
  }

  async delete(id) {
    return await this.userModel.delete({ _id: id });
  }
}
