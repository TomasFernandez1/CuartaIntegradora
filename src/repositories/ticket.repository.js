import ticketDto from '../dtos/ticket.dto.js'
import { faker } from '@faker-js/faker'

export default class TicketRespository{
    constructor(dao){
        this.dao = dao;
    }


    getTicket = async () =>{
        return await this.dao.get()
    }

    getTicketBy = async (id) => {
        return await this.dao.getBy(id)
    }

    createTicket = async (amount, purchaser) => {
        const code = faker.string.alphanumeric({ length: {min: 10, max: 16} })

        const ticket = new ticketDto({code, amount, purchaser})

        return await this.dao.create(ticket)
    }

    deleteTicket = async(id) => {
        return await this.dao.delete(id)
    }

    updateTicket = async(id, newTicket) =>{
        return await this.dao.update(id, newTicket)
    }
}