import joi from "joi";

export const generalFields = {
  email: joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),

  userName: joi.string().required().messages({
    "string.empty": "User name is required",
  }),

  message: joi.string().required().messages({
    "string.empty": "Message is required",
  }),
};

export const validation = (Schema) => {
  return (req, res, next) => {
    const dataMethods = ["body", "query", "params", "headers", "file"];
    const validationArray = [];

    dataMethods.forEach((key) => {
      if (Schema[key]) {
        const validationResult = Schema[key].validate(req[key], {
          abortEarly: false,
        });

        console.log(`Validating ${key}:`, req[key]); // Log the request data being validated

        if (validationResult.error) {
          console.log(`Validation errors for ${key}:`, validationResult.error.details); // Log validation errors
          validationArray.push(validationResult.error.details);
        }
      }
    });

    if (validationArray.length > 0) {
      console.log('Validation failed:', validationArray); // Log the entire validation array for debugging
      return res.status(400).json({ message: "Validation error", errors: validationArray });
    } else {
      next(); // Proceed to the next middleware or route handler
    }
  };
};

