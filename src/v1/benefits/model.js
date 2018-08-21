import mongoose from 'mongoose'
import db from '../../utils/db'

db.connect()

const Schema = mongoose.Schema

const benefitSchema = new Schema({
  label: String
})

benefitSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
benefitSchema.set('toJSON', {
  virtuals: true
})

benefitSchema.findById = function(cb) {
  return this.model('Benefits').find({ id: this.id }, cb)
}

const Benefit = mongoose.model('Benefits', benefitSchema)

const findById = id => {
  return Benefit.findById(id).then(result => {
    result = result.toJSON()
    delete result._id
    delete result.__v
    return result
  })
}

const createBenefit = benefitData => {
  const benefit = new Benefit(benefitData)
  return benefit.save()
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Benefit.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, benefits) {
        if (err) {
          reject(err)
        } else {
          resolve(benefits)
        }
      })
  })
}

const patchBenefit = (id, benefitData) => {
  return new Promise((resolve, reject) => {
    Benefit.findById(id, function(err, benefit) {
      if (err) reject(err)
      for (let i in benefitData) {
        benefit[i] = benefitData[i]
      }
      benefit.save(function(err, updatedBenefit) {
        if (err) return reject(err)
        resolve(updatedBenefit)
      })
    })
  })
}

const removeById = benefitId => {
  return new Promise((resolve, reject) => {
    Benefit.remove({ _id: benefitId }, err => {
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
  createBenefit,
  list,
  patchBenefit,
  removeById
}
