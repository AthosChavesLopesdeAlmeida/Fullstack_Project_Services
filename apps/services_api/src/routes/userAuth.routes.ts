import { userController } from "../controllers/user.controller";
import { authMiddleware,  } from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)

router.delete('/delete', authMiddleware, userController.delete)

router.post('/logout', userController.logout)

export default router