import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedback from './component/Feedback';
import Home from './component/Home';
import Contact from './component/Contact';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import About from './component/About';
import NotFound from "./component/NotFound";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
