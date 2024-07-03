import Joi from 'joi';
import nodemailer from 'nodemailer';

const contactSchema = Joi.object({
  Name: Joi.string().trim().min(1).required().messages({
    "string.empty": "Name is required"
  }),
  Email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address"
  }),
  Message: Joi.string().trim().min(1).required().messages({
    "string.empty": "Message is required"
  })
});
const sendEmail = async (dest, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tharaasukaina@gmail.com", //الايميل اللي بدي ابعث منو رسائل
      pass: "fzca ncml psje hkpm", // كلمة مرور التطبيق من حساب جوجل
    }, // هاي كلمة السر عشان ادب رسل ايميلات من هاد الايميل المكتوب
  });

  let info = await transporter.sendMail({
    from: "tharaasukaina@gmail.com",
    to: dest,
    subject: subject,
    text: text,
  });
  console.log("Email sent: %s", info.messageId);
};

export const contact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation errors",
        errors: error.details.map(detail => detail.message)
      });
    }

    const { Name ,Email,Message  } = req.body;

  console.log(Name ,Email,Message );

    await sendEmail(
      "tharaaraed1@gmail.com",
      "New Massege Received",
      `NAME: ${Name}\nMassage: ${Message}\nFrom: ${Email}`
    );
    return res
      .status(200)
      .json({ message: "Massege submitted successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}; 