import { professionalController } from "../controllers/professional.controller"; 
import { authMiddleware,  } from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router()

router.post('/create', authMiddleware, professionalController.create)

router.post('/delete', authMiddleware, professionalController.delete)

router.get('/findByServiceName', professionalController.findByServiceName)

export default router

