import RouterClass from './router.js'
import UserController from '../controllers/users.controller.js'
import { uploader } from '../utils/multer.js';

const { getUsers, getUser, uploadDocuments, updateUser } = new UserController()

export default class usersRouter extends RouterClass {
  init() {
    // Users view
    this.get('/', ['ADMIN'], getUsers)

    this.get('/upload-documents', ['USER', 'ADMIN', 'PREMIUM'], async (req, res) => {
      res.render('upload-documents', {user: req.user})
    })
    
    this.get('/:uid', ['ADMIN'], getUser)

    this.post('/:uid/premium', ['ADMIN'], updateUser)

    this.post('/:uid/documents', ['USER', 'PREMIUM', 'ADMIN'], uploader.any() ,uploadDocuments)
    

  }
}