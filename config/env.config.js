const host = require('network-address')()

export default {
  port: process.env.PORT || process.env.NODE_PORT || 6400,
  host: host,
  apiVersion: process.env.API_VERSION || 1,
  appUrl: 'http://$(host):$(port)',
  apiUrl: '$(appUrl)/v$(apiVersion)',
  jwtSecret: 'myS33!!creeeT',
  jwtTTL: 1000 * 60 * 60 * 24 * 30, // 30 days
  environment: process.env.NODE_ENV || 'dev',
  permissionLevels: {
    FREE: 1,
    PAID: 4,
    ADMIN: 2048
  }
}
