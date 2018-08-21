import JobsController from './controller'
import PermissionMiddleware from '../../middleware/authPermission'
import ValidationMiddleware from '../../middleware/authValidation'
import config from '../../../config/env.config'

const routesConfig = app => {
  const { FREE, PAID, ADMIN } = config.permissionLevels

  app.post('/jobs', [JobsController.insert])

  app.get('/jobs', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    JobsController.list
  ])

  app.get('/jobs/:jobId', [
    // ValidationMiddleware.validJWTNeeded,
    // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    JobsController.getById
  ])

  app.patch('/jobs/:jobId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    JobsController.patchById
  ])

  app.delete('/jobs/:jobId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    JobsController.removeById
  ])
}

export default routesConfig
