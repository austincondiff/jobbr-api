import mongoose from 'mongoose'
import db from '../../utils/db'

db.connect()

const Schema = mongoose.Schema

const jobSchema = new Schema({
  title: String,
  description: String,
  responsibilities: String,
  skills: {
    description: String,
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Skills'
      }
    ]
  },
  culture: {
    description: String,
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CulturalAttributes'
      }
    ]
  },
  // compensation: String,
  // location: Number,
  benefits: {
    description: String,
    tags: {
      description: String,
      tags: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Benefits'
        }
      ]
    }
  },
  // companyId: Number,
  dateModified: { type: Date, default: Date.now },
  dateCreated: { type: Date, default: Date.now }
})

jobSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
jobSchema.set('toJSON', {
  virtuals: true
})

jobSchema.findById = function(cb) {
  return this.model('Jobs').find({ id: this.id }, cb)
}

const Job = mongoose.model('Jobs', jobSchema)

const findById = id => {
  return Job.findById(id)
    .populate('skills.tags')
    .populate('culture.tags')
    .populate('benefits.tags')
    .then(result => {
      result = result.toJSON()
      delete result._id
      delete result.__v
      return result
    })
}

const createJob = jobData => {
  const job = new Job(jobData)
  return job.save()
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Job.find()
      .limit(perPage)
      .skip(perPage * page)
      .populate('skills.tags')
      .populate('culture.tags')
      .populate('benefits.tags')
      .exec(function(err, jobs) {
        if (err) {
          reject(err)
        } else {
          resolve(jobs)
        }
      })
  })
}

const patchJob = (id, jobData) => {
  return new Promise((resolve, reject) => {
    Job.findById(id, function(err, job) {
      if (err) reject(err)
      for (let i in jobData) {
        job[i] = jobData[i]
      }
      job.dateModified = Date.now()
      job.save(function(err, updatedJob) {
        if (err) return reject(err)
        resolve(updatedJob)
      })
    })
  })
}

const removeById = jobId => {
  return new Promise((resolve, reject) => {
    Job.remove({ _id: jobId }, err => {
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
  createJob,
  list,
  patchJob,
  removeById
}
