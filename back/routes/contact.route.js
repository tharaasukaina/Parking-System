import { Router } from "express";
import * as contactRouter from '../controllers/contact.controller.js';
// import * as validator from './contact.validaition.js';
// import { validation } from "../src/middleware/validation.js";

const router=Router();
router.post('/contact',contactRouter.contact)

export default router;




// validation(validator.contactSchema),

