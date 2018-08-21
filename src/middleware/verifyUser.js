import UserModel from '../v1/users/model'
import bcrypt from 'bcryptjs'

const hasAuthValidFields = (req, res, next) => {
  let errors = []

  if (req.body && (req.body.email || req.body.password)) {
    if (!req.body.email && req.body.password) {
      errors.push('Missing email field')
    }
    if (!req.body.password && req.body.email) {
      errors.push('Missing password field')
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(',') })
    } else {
      return next()
    }
  } else {
    return res.status(400).send({ errors: 'Missing email and password fields' })
  }
}

const isPasswordAndUserMatch = (req, res, next) => {
  UserModel.findByEmail(req.body.email).then(user => {
    if (!user[0]) {
      res.status(404).send({})
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user[0].password
      )
      if (passwordIsValid) {
        req.body = {
          userId: user[0]._id,
          email: user[0].email,
          permissionLevel: user[0].permissionLevel,
          provider: 'email',
          name: user[0].firstName + ' ' + user[0].lastName
        }
        return next()
      } else {
        return res.status(400).send({ errors: ['Invalid e-mail or password'] })
      }
    }
  })
}

export default {
  hasAuthValidFields,
  isPasswordAndUserMatch
}
