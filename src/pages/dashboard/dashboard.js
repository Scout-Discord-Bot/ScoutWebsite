import React from 'react';
import './dashboard.css';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';

const Dashboard = () => {
  
    return (
      <div>
        <Navigation></Navigation>
        <div className="dashboard">
          <h1>Dashboard</h1>
          <p>Welcome to the dashboard. More Coming Soon!</p>
        </div>
        <Footer></Footer>
      </div>
    );
  };
  
  export default Dashboard;