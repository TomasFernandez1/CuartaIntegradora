import bcrypt from 'bcrypt'

export const isValidPassword = (password, userPassword) => bcrypt.compareSync(password, userPassword)