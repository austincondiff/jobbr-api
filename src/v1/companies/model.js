import mongoose from 'mongoose'
import db from '../../utils/db'

db.connect()

const Schema = mongoose.Schema

const companySchema = new Schema({
  name: String,
  description: String,
  dateModified: { type: Date, default: Date.now },
  dateCreated: { type: Date, default: Date.now }
})

companySchema.virtual('id').get(function() {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
companySchema.set('toJSON', {
  virtuals: true
})

companySchema.findById = function(cb) {
  return this.model('Companies').find({ id: this.id }, cb)
}

const Company = mongoose.model('Companies', companySchema)

const findById = id => {
  return Company.findById(id).then(result => {
    result = result.toJSON()
    delete result._id
    delete result.__v
    return result
  })
}

const createCompany = companyData => {
  const company = new Company(companyData)
  return company.save()
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Company.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, companys) {
        if (err) {
          reject(err)
        } else {
          resolve(companys)
        }
      })
  })
}

const patchCompany = (id, jobData) => {
  return new Promise((resolve, reject) => {
    Company.findById(id, function(err, job) {
      if (err) reject(err)
      for (let i in jobData) {
        job[i] = jobData[i]
      }
      job.dateModified = Date.now()
      job.save(function(err, updatedCompany) {
        if (err) return reject(err)
        resolve(updatedCompany)
      })
    })
  })
}

const removeById = companyId => {
  return new Promise((resolve, reject) => {
    Company.remove({ _id: companyId }, err => {
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
  createCompany,
  list,
  patchCompany,
  removeById
}
