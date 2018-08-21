import VerifyUserMiddleware from '../../middleware/verifyUser'
import AuthorizationController from './controller'
import AuthValidationMiddleware from '../../middleware/authValidation'

const routesConfig = function(app) {
  app.post('/auth', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
  ])
  app.post('/auth/refresh', [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login
  ])
}

export default routesConfig
