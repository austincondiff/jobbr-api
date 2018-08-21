import BenefitsController from './controller'
import PermissionMiddleware from '../../middleware/authPermission'
import ValidationMiddleware from '../../middleware/authValidation'
import config from '../../../config/env.config'

const routesConfig = app => {
  const { FREE, PAID, ADMIN } = config.permissionLevels

  app.post('/benefits', [BenefitsController.insert])

  app.get('/benefits', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    BenefitsController.list
  ])

  app.get('/benefits/:benefitId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    BenefitsController.getById
  ])

  app.patch('/benefits/:benefitId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    BenefitsController.patchById
  ])

  app.delete('/benefits/:benefitId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    BenefitsController.removeById
  ])
}

export default routesConfig
