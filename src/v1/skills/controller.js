import SkillModel from './model'

const insert = (req, res) => {
  SkillModel.createSkill(req.body).then(result => {
    res.status(201).send({ ...req.body, id: result._id })
  })
}

const getById = (req, res) => {
  SkillModel.findById(req.params.userId).then(result => {
    res.status(200).send(result)
  })
}

const patchById = (req, res) => {
  SkillModel.patchSkill(req.params.skillId, req.body).then(result => {
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
  SkillModel.list(limit, page).then(result => {
    res.status(200).send(result)
  })
}

const removeById = (req, res) => {
  SkillModel.removeById(req.params.userId).then(result => {
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
