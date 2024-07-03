import React, { useState } from "react";
import image from "../image/contact.png";
import '../style/Contact.css';
import { ContactUs } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Joi from 'joi';

const Contact = () =>{
    let [Name, setContactName] = useState('');
    let [Email, setContactEmail] = useState('');
    let [Message, setContactMessage] = useState('');

  
    const handleNameChange = (event) => {
      setContactName(event.target.value);
    };
    const handleEmailChange = (event) => {
      setContactEmail(event.target.value);
    };
    const handleMessageChange = (event) => {
      setContactMessage(event.target.value);
    };
  
    const schema = Joi.object({
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
    const handleSubmit = async (event) => {
      event.preventDefault()
      const { error } = schema.validate({ Name ,Email,Message }, { abortEarly: false });
      
      if (error) {
        error.details.forEach(detail => toast.error(detail.message));
        return;
      }
  
      try {
        await ContactUs(Name ,Email,Message);
        toast.success("Thanks for your massage, its submitted successfully");
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } catch (error) {
        toast.error("There was an error submitting your massage");
        console.error("there is an error:", error);
      }
   };
  
    return(
        <div className="interior_13">
        <div className="responsive-container-block big-container">
          <div className="responsive-container-block container">
            <div className="responsive-container-block">
              <div className="orange-card">
              </div>
              <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-ipadp-12 wk-desk-6" id="i7wk">
                <div className="card-content">
                  <p className="text-blk section-head">
                    Get in touch
                  </p>
                  <p className="text-blk sub-head">
                    Feel free to contact us any time. We will get back to you as soon as we can!  
                  </p>
                  <form className="for">
  
        <div className="form-group position-relative">
          <label htmlFor="formName" className="d-block">
            <i className="icon" data-feather="user"></i>
          </label>
          <input required type="text" id="formName" className="form-control form-control-lg thick" placeholder="Name" name="Name" value={Name} onChange={handleNameChange}/>
        </div>
  
        
        <div className="form-group position-relative">
          <label htmlFor="formEmail" className="d-block">
            <i className="icon" data-feather="mail"></i>
          </label>
          <input required type="email" id="formEmail" className="form-control form-control-lg thick" placeholder="email" name="Email"  value={Email} onChange={handleEmailChange}/>
        </div>
  
        
        <div className="form-group message">
          <textarea required id="formMessage" className="form-control form-control-lg" rows="7" placeholder="Message" name="Message" value={Message} onChange={handleMessageChange }></textarea>
        </div>
      
        
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>Send</button>
        </div>
    </form>
                </div>
              </div>
              <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-ipadp-12 wk-desk-6 img-one" id="iwgx">
                <img className="img-sofa3" src={image} alt="image1"/>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
    	position="top-center"
    	/>
      </div>
          );
        };
export default Contact; 
