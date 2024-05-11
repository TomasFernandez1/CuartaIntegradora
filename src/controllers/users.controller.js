import { userService } from '../repositories/index.js'

export default class userController {
  constructor() {
    this.service = userService
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.service.getUsers()
      res.render('users', { users, user: req.user })
    } catch (error) {
      res.sendServerError(error)
    }
  }

  getUser = async (req, res) => {
    try {
      const { uid } = req.params
      const user = await this.service.getUserBy(uid)
      res.render('user', { userPage: user, user: req.user })
    } catch (error) {
      res.sendServerError(error)
    }
  }

  updateUser = async (req, res) => {
    try {
      const { uid } = req.params
      const { role } = req.body
      const user = await this.service.getUserBy(uid)

      if (!user) {
        req.logger.error('User not found')
        res.sendServerError('User not found')
      }

      const requiredTypes = ['identity', 'myAddress', 'myAccount']
      const requiredDocs = requiredTypes.every((type) =>
        user.documents.some((doc) => doc.docType.includes(type))
      )

      if (role === 'PREMIUM') {
        if (requiredDocs) {
          await userService.updateUser(uid, { role })
          return res.sendSuccess(`User role updated to ${role}`)
        } else {
          return res.sendServerError('You need to upload documents to be premium.')
        }
      }
    } catch (error) {
      req.logger.error(`Error: ${error}`)
      res.sendServerError(error)
    }
  }

  uploadDocuments = async (req, res) => {
    try {
      const { uid } = req.params
      const files = req.files

      if (files) {
        files.forEach(async (file) => {
          await userService.updateUser(
            uid,
            {
              $addToSet: {
                documents: {
                  name: file.filename,
                  reference: file.destination,
                  docType: file.fieldname
                }
              }
            }
          )
        })
        return res.sendSuccess(`This files was uploaded: ${files.map(
          (file) => ` ${file.fieldname}`
        )}`)
      } else {
        return res.sendServerError('Error trying to upload files')
      }
    } catch (error) {
      req.logger.error(error)
      res.sendServerError(`User controller - Error: ${error}`)
    }
  }
}
