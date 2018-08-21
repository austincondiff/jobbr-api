import SkillsController from './controller'
import PermissionMiddleware from '../../middleware/authPermission'
import ValidationMiddleware from '../../middleware/authValidation'
import config from '../../../config/env.config'

const routesConfig = app => {
  const { FREE, PAID, ADMIN } = config.permissionLevels

  app.post('/skills', [SkillsController.insert])

  app.get('/skills', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    SkillsController.list
  ])

  app.get('/skills/:skillId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    SkillsController.getById
  ])

  app.patch('/skills/:skillId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    SkillsController.patchById
  ])

  app.delete('/skills/:skillId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    SkillsController.removeById
  ])
}

export default routesConfig
