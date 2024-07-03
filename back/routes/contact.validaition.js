import joi from "joi";
import  { generalFields } from "../src/middleware/validation.js";

export const contactSchema = {
    body: joi.object({
        userName: joi.string().required(),
        email: generalFields.email,
        message: generalFields.message,
    }),
};

