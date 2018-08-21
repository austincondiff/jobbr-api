import mongoose from 'mongoose'
import db from '../../utils/db'

db.connect()

const Schema = mongoose.Schema

const culturalAttributeSchema = new Schema({
  label: String
})

culturalAttributeSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
culturalAttributeSchema.set('toJSON', {
  virtuals: true
})

culturalAttributeSchema.findById = function(cb) {
  return this.model('CulturalAttributes').find({ id: this.id }, cb)
}

const CulturalAttribute = mongoose.model(
  'CulturalAttributes',
  culturalAttributeSchema
)

const findById = id => {
  return CulturalAttribute.findById(id).then(result => {
    result = result.toJSON()
    delete result._id
    delete result.__v
    return result
  })
}

const createCulturalAttribute = culturalAttributeData => {
  const culturalAttribute = new CulturalAttribute(culturalAttributeData)
  return culturalAttribute.save()
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    CulturalAttribute.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, culturalAttributes) {
        if (err) {
          reject(err)
        } else {
          resolve(culturalAttributes)
        }
      })
  })
}

const patchCulturalAttribute = (id, culturalAttributeData) => {
  return new Promise((resolve, reject) => {
    CulturalAttribute.findById(id, function(err, culturalAttribute) {
      if (err) reject(err)
      for (let i in culturalAttributeData) {
        culturalAttribute[i] = culturalAttributeData[i]
      }
      culturalAttribute.save(function(err, updatedCulturalAttribute) {
        if (err) return reject(err)
        resolve(updatedCulturalAttribute)
      })
    })
  })
}

const removeById = culturalAttributeId => {
  return new Promise((resolve, reject) => {
    CulturalAttribute.remove({ _id: culturalAttributeId }, err => {
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
  createCulturalAttribute,
  list,
  patchCulturalAttribute,
  removeById
}
