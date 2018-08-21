import CulturalAttributeModel from './model'

const insert = (req, res) => {
  CulturalAttributeModel.createCulturalAttribute(req.body).then(result => {
    res.status(201).send({ ...req.body, id: result._id })
  })
}

const getById = (req, res) => {
  CulturalAttributeModel.findById(req.params.userId).then(result => {
    res.status(200).send(result)
  })
}

const patchById = (req, res) => {
  CulturalAttributeModel.patchCulturalAttribute(
    req.params.culturalAttributeId,
    req.body
  ).then(result => {
    res.status(200).send(result)
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
  CulturalAttributeModel.list(limit, page).then(result => {
    res.status(200).send(result)
  })
}

const removeById = (req, res) => {
  CulturalAttributeModel.removeById(req.params.userId).then(result => {
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
