import UserModel from './model'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const insert = (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  req.body.password = bcrypt.hashSync(req.body.password, salt)
  req.body.permissionLevel = 1
  UserModel.createUser(req.body).then(result => {
    res.status(201).send({ ...req.body, password: undefined, id: result._id })
  })
}

const getById = (req, res) => {
  UserModel.findById(req.params.userId).then(result => {
    res.status(200).send(result)
  })
}

const patchById = (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto
      .createHmac('sha512', salt)
      .update(req.body.password)
      .digest('base64')
    req.body.password = salt + '$' + hash
  }
  UserModel.patchUser(req.params.userId, req.body).then(result => {
    res.status(204).send({})
  })
}

const list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
  let page = 0
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page)
      page = Number.isInteger(req.query.page) ? req.query.page : 0
    }
  }
  UserModel.list(limit, page).then(result => {
    res.status(200).send(result)
  })
}

const removeById = (req, res) => {
  UserModel.removeById(req.params.userId).then(result => {
    res.status(204).send({})
  })
}

export default {
  insert,
  getById,
  patchById,
  list,
  removeById
}
