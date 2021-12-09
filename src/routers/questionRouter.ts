import { Router } from "express";
import * as questionController from '../controllers/questionController';

const router = new (Router as any)();

router.post('/', questionController.postQuestion);

export default router;