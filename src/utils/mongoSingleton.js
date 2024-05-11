import mongoose from "mongoose";

export class MongoSingleton {
    
    static #instance
    constructor(url) {
        mongoose.connect(url);
  }

  static getInstance(url) {
    if(this.#instance){
        console.log('DB previous connected');
        return this.#instance
    }


    this.#instance = new MongoSingleton(url)
    console.log('Database connected');
    return this.#instance

  }
  


  
}