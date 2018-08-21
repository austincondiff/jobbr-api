import CulturalAttributesController from './controller'
import PermissionMiddleware from '../../middleware/authPermission'
import ValidationMiddleware from '../../middleware/authValidation'
import config from '../../../config/env.config'

const routesConfig = app => {
  const { FREE, PAID, ADMIN } = config.permissionLevels

  app.post('/culturalAttributes', [CulturalAttributesController.insert])

  app.get('/culturalAttributes', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    CulturalAttributesController.list
  ])

  app.get('/culturalAttributes/:culturalAttributeId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    CulturalAttributesController.getById
  ])

  app.patch('/culturalAttributes/:culturalAttributeId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    CulturalAttributesController.patchById
  ])

  app.delete('/culturalAttributes/:culturalAttributeId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    CulturalAttributesController.removeById
  ])
}

export default routesConfig
