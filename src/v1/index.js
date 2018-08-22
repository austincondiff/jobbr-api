import authRoutesConfig from './auth/routes'
import usersRoutesConfig from './users/routes'
import jobsRoutesConfig from './jobs/routes'
import skillsRoutesConfig from './skills/routes'
import culturalAttributesRoutesConfig from './culturalAttributes/routes'
import benefitsRoutesConfig from './benefits/routes'

export default function(app) {
  authRoutesConfig(app)
  usersRoutesConfig(app)
  jobsRoutesConfig(app)
  skillsRoutesConfig(app)
  culturalAttributesRoutesConfig(app)
  benefitsRoutesConfig(app)
}
