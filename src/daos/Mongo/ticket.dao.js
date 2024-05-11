import ticketModel from '../../models/ticket.model.js'

export default class ticketManagerMongo {
    constructor(){
        this.model = ticketModel
    }

    async get(){
        return await this.model.find().lean()
    }

    async getBy(id){
        return await this.model.findById({_id: id})
    }

    async create(ticket){
        return await this.model.create(ticket)
    }

    async delete(tid){
        return await this.model.findByIdAndUpdate({_id: tid})
    }

    async update(tid, newTicket){
        return await this.model.findByIdAndUpdate(tid, newTicket)
    }
}