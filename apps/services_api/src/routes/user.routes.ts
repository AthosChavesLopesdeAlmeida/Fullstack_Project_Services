import { userController } from "../controllers/user.controller";
import { Router } from "express";

const router = Router()

router.get('/findMany', userController.findByName)

export default router