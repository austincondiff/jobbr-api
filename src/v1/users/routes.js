import UsersController from './controller'
import PermissionMiddleware from '../../middleware/authPermission'
import ValidationMiddleware from '../../middleware/authValidation'
import config from '../../../config/env.config'

const routesConfig = app => {
  const { FREE, PAID, ADMIN } = config.permissionLevels

  app.post('/users', [UsersController.insert])

  app.get('/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    UsersController.list
  ])

  app.get('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.getById
  ])

  app.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.patchById
  ])

  app.delete('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UsersController.removeById
  ])
}

export default routesConfig
