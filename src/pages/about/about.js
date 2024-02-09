import React from 'react';
import './about.css';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';

const About = () => {
  
    return (
      <div>
        <Navigation></Navigation>
        <div className="about">
          <h1>About Us</h1>
          <p>Welcome to the about us page. More Coming Soon!</p>
        </div>
        <Footer></Footer>
      </div>
    );
  };
  
  export default About;