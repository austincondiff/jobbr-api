import config from '../../../config/env.config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import uuid from 'uuid'

const { jwtSecret } = config

const login = (req, res) => {
  try {
    let refreshId = req.body.userId + jwtSecret
    const salt = bcrypt.genSaltSync(10)
    let hash = crypto
      .createHmac('sha512', salt)
      .update(refreshId)
      .digest('base64')
    req.body.refreshKey = salt
    let token = jwt.sign(req.body, jwtSecret)
    let b = Buffer.from(hash, 'base64')
    let refresh_token = b.toString('base64')
    res.status(201).send(
      Object.assign({}, req.body, {
        accessToken: token,
        refreshToken: refresh_token
      })
    )
  } catch (err) {
    res.status(500).send({ errors: err })
  }
}

export default { login }
