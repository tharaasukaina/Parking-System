import React, { useState } from "react";
import '../style/Feedback.css';
import { youreExperince1 } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Joi from 'joi';

const Feedback = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const schema = Joi.object({
    selectedEmotion: Joi.string().required().messages({
      "string.empty": "Please select an emotion"
    }),
    feedbackText: Joi.string().trim().min(1).required().messages({
      "string.empty": "Please write your feedback"
    })
  });
  const handleSubmit = async () => {
    const { error } = schema.validate({ selectedEmotion, feedbackText }, { abortEarly: false });
    
    if (error) {
      error.details.forEach(detail => toast.error(detail.message));
      return;
    }

    try {
      await youreExperince1(selectedEmotion, feedbackText);
      toast.success("Thanks for your Feedback, its submitted successfully");
      setSelectedEmotion('');
      setFeedbackText('');
    } catch (error) {
      toast.error("There was an error submitting your feedback");
      console.error("there is an error:", error);
    }
 };

  return (
    <div className="content">
      <div className="cont">
        <div className="head">
          <div className="heading"><h1>Your opinion matters to us</h1></div>
          <div className="close"></div>
        </div>
        <div className="mid">
          <div className={`media ${selectedEmotion === 'angry' ? 'active' : ''}`} onClick={() => handleEmotionClick('angry')}>
            <img src="https://cdn-icons-png.flaticon.com/128/3260/3260838.png" alt="angry" />
          </div>
          <div className={`media ${selectedEmotion === 'moderate' ? 'active' : ''}`} onClick={() => handleEmotionClick('moderate')}>
            <img src="https://cdn-icons-png.flaticon.com/128/42/42901.png" alt="moderate" />
          </div> 
          <div className={`media ${selectedEmotion === 'neutral' ? 'active' : ''}`} onClick={() => handleEmotionClick('neutral')}>
            <img src="https://cdn-icons-png.flaticon.com/128/3260/3260877.png" alt="neutral" />
          </div>
          <div className={`media ${selectedEmotion === 'smile' ? 'active' : ''}`} onClick={() => handleEmotionClick('smile')}>
            <img src="https://cdn-icons-png.flaticon.com/128/569/569501.png" alt="smile" />
          </div> 
          <div className={`media ${selectedEmotion === 'happy' ? 'active' : ''}`} onClick={() => handleEmotionClick('happy')}>
            <img src="https://cdn-icons-png.flaticon.com/128/1356/1356639.png" alt="happy" />
          </div>
        </div>
        <div className="textarea">
          <p>Share your experience</p>
          <textarea className="exp" id="exp" placeholder="Let us know..." value={feedbackText} onChange={handleFeedbackChange}></textarea>
        </div>
        <div className="end">
          <div className="submission">
            <button className="sub btn" onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
      <ToastContainer
    	position="top-center"
    	/>
    </div>
  );
};

export default Feedback;
