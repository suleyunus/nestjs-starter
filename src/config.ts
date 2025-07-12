import Session from 'supertokens-node/recipe/session'
import EmailPassword from 'supertokens-node/recipe/emailpassword'
import Passwordless from 'supertokens-node/recipe/passwordless'
import Dashboard from 'supertokens-node/recipe/dashboard'
import UserRoles from 'supertokens-node/recipe/userroles'

export const appInfo = {
  appName: 'NestJS Starter',
  apiDomain: 'http://localhost:3000',
  websiteDomain: 'http://localhost:4200',
  apiBasePath: '/api/auth',
}

export const connectionURI = 'http://supertokens:3567'

export const recipeList = [
  EmailPassword.init(),
  Passwordless.init({
    contactMethod: 'EMAIL_OR_PHONE',
    flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
  }),
  Session.init(),
  Dashboard.init(),
  UserRoles.init(),
]
