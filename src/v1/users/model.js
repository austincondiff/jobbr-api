import mongoose from 'mongoose'
import db from '../../utils/db'

db.connect()

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: String,
  password: String,
  phone: String,
  title: String,
  address: {
    street: String,
    unit: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  status: String,
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
  benefits: {
    description: String,
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Benefits'
      }
    ]
  },
  compensation: String,
  location: Number,
  education: Array,
  jobHistory: Array,
  resumes: Array,
  emergencyContacts: Array,
  permissionLevel: Number,
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'Employers'
  },
  recruiter: {
    type: Schema.Types.ObjectId,
    ref: 'Recruiters'
  }
})

userSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
})

userSchema.findById = function(cb) {
  return this.model('Users').find({ id: this.id }, cb)
}

const User = mongoose.model('Users', userSchema)

const findByEmail = email => {
  return User.find({ email: email })
}

const findById = id => {
  return User.findById(id)
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

const createUser = userData => {
  const user = new User(userData)
  return user.save()
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .populate('skills.tags')
      .populate('culture.tags')
      .populate('benefits.tags')
      .exec(function(err, users) {
        if (err) {
          reject(err)
        } else {
          resolve(users)
        }
      })
  })
}

const patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, function(err, user) {
      if (err) reject(err)
      for (let i in userData) {
        user[i] = userData[i]
      }
      user.save(function(err, updatedUser) {
        if (err) return reject(err)
        resolve(updatedUser)
      })
    })
  })
}

const removeById = userId => {
  return new Promise((resolve, reject) => {
    User.remove({ _id: userId }, err => {
      if (err) {
        reject(err)
      } else {
        resolve(err)
      }
    })
  })
}

export default {
  findByEmail,
  findById,
  createUser,
  list,
  patchUser,
  removeById
}
