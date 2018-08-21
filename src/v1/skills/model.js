import mongoose from 'mongoose'
import db from '../../utils/db'

db.connect()

const Schema = mongoose.Schema

const skillSchema = new Schema({
  label: String
})

skillSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
skillSchema.set('toJSON', {
  virtuals: true
})

skillSchema.findById = function(cb) {
  return this.model('Skills').find({ id: this.id }, cb)
}

const Skill = mongoose.model('Skills', skillSchema)

const findById = id => {
  return Skill.findById(id).then(result => {
    result = result.toJSON()
    delete result._id
    delete result.__v
    return result
  })
}

const createSkill = skillData => {
  const skill = new Skill(skillData)
  return skill.save()
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Skill.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, skills) {
        if (err) {
          reject(err)
        } else {
          resolve(skills)
        }
      })
  })
}

const patchSkill = (id, skillData) => {
  return new Promise((resolve, reject) => {
    Skill.findById(id, function(err, skill) {
      if (err) reject(err)
      for (let i in skillData) {
        skill[i] = skillData[i]
      }
      skill.save(function(err, updatedSkill) {
        if (err) return reject(err)
        resolve(updatedSkill)
      })
    })
  })
}

const removeById = skillId => {
  return new Promise((resolve, reject) => {
    Skill.remove({ _id: skillId }, err => {
      if (err) {
        reject(err)
      } else {
        resolve(err)
      }
    })
  })
}

export default {
  findById,
  createSkill,
  list,
  patchSkill,
  removeById
}
