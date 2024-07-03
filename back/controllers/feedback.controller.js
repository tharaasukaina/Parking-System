import Joi from 'joi';
import nodemailer from 'nodemailer';

const feedbackSchema = Joi.object({
  emotion: Joi.string().required().messages({
    "any.required": "Emotion is required"
  }),
  text: Joi.string().trim().min(1).required().messages({
    "string.empty": "Feedback text is required"
  })
});

const sendEmail = async (dest, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tharaasukaina@gmail.com",
      pass: "fzca ncml psje hkpm",
    },
  });

  let info = await transporter.sendMail({
    from: "tharaasukaina@gmail.com",
    to: dest,
    subject: subject,
    text: text,
  });
  console.log("Email sent: %s", info.messageId);
};

export const youreExperince = async (req, res) => {
  try {
    const { error } = feedbackSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation errors",
        errors: error.details.map(detail => detail.message)
      });
    }

    const { emotion, text } = req.body;

    await sendEmail(
      "tharaaraed1@gmail.com",
      "New Feedback Received",
      `Emotion: ${emotion}\nFeedback: ${text}`
    );

    return res.status(200).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};// express validator
//res container موحد لكل الريكويست 