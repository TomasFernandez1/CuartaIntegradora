export default class UserDTO {
    constructor(user){
        this._id = user._id
        this.full_name  = `${user.first_name} ${user.last_name}`
        this.first_name = user.first_name
        this.last_name  = user.last_name
        this.email      = user.email
        this.role = user.role
        this.cartId = user.cartId
        this.documents = user.documents
        this.lastConnection = user.lastConnection
    }
}