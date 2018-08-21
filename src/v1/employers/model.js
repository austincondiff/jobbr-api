import mongoose from 'mongoose'
import db from '../../utils/db'

db.connect()

const Schema = mongoose.Schema

const employerSchema = new Schema({
  name: String,
  description: String,
  dateModified: { type: Date, default: Date.now },
  dateCreated: { type: Date, default: Date.now }
})

employerSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
employerSchema.set('toJSON', {
  virtuals: true
})

employerSchema.findById = function(cb) {
  return this.model('Employers').find({ id: this.id }, cb)
}

const Employer = mongoose.model('Employers', employerSchema)

const findById = id => {
  return Employer.findById(id).then(result => {
    result = result.toJSON()
    delete result._id
    delete result.__v
    return result
  })
}

const createEmployer = employerData => {
  const employer = new Employer(employerData)
  return employer.save()
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Employer.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, employers) {
        if (err) {
          reject(err)
        } else {
          resolve(employers)
        }
      })
  })
}

const patchEmployer = (id, jobData) => {
  return new Promise((resolve, reject) => {
    Employer.findById(id, function(err, job) {
      if (err) reject(err)
      for (let i in jobData) {
        job[i] = jobData[i]
      }
      job.dateModified = Date.now()
      job.save(function(err, updatedEmployer) {
        if (err) return reject(err)
        resolve(updatedEmployer)
      })
    })
  })
}

const removeById = employerId => {
  return new Promise((resolve, reject) => {
    Employer.remove({ _id: employerId }, err => {
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
  createEmployer,
  list,
  patchEmployer,
  removeById
}
