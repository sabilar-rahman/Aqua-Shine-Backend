import { Router } from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'


const router = Router()

router.get('/', auth(USER_ROLE.admin), UserController.getAllUser)

router.put('/:id', auth(USER_ROLE.admin), UserController.updateUserRole)

router.put(
  '/update/:id',
  auth(USER_ROLE.user),
  UserController.updateUserProfile,
)

export const UserRoutes = router