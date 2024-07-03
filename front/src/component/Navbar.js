import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/logo1 (2).png';
import '../style/Nav.css';
import ReactLoading from "react-loading";
import { useState, useEffect } from 'react';


<img src={logo} alt="Bootstrap" width="100" />
//introduction page
const IntroductionPage = () => {
  return (
    <div className="introduction">
      <img className='ima2' src={logo} alt='ima'></img>
      <h1 className='introText'>Welcome to Our Website</h1>
      <p className='lod'>please wait a moment...</p>
      <ReactLoading className='load'
                type="spinningBubbles"
                color="#f1f1f1"
                height={100}
                width={50}
            />
      
    </div>
  );
};

const Navbar = () => {
  const [showIntroduction, setShowIntroduction] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroduction(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (showIntroduction) {
    return <IntroductionPage />;
  }

  return (
    <>
 <nav className="navbar">
        <div className="container container-nav">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Bootstrap" width="120" />
          </Link>
          <Link className="nav-link" to="/Home">Home</Link>
          <Link className="nav-link" to="/About">About</Link>
          <Link className="nav-link" to="/Feedback">Feedback</Link>
          <Link className="nav-link" to="/Contact">Contact Us</Link>
            
        
          <div className="navbar bg-bg-transparent">
            <div className="container-fluid">
             
            </div>
          </div>
        </div>
        <div/>
      </nav>

    </>
  );
};

export default Navbar;