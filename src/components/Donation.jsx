import React from 'react';
import './Donation.css'; // Optional CSS file for better styling
// import { padding } from '@mui/system';

// Header component
const Header = () => {
  return (
    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h1>Join Us in Making a Difference: Donate Today</h1>
      <p style={{ color: '#6b7280' }}>
        Hundreds of Organizations, Big and Small, Have Made a Lasting Impact with Our Support
      </p>
    </header>
  );
};

// Stats component
const Stats = () => {
  const statsData = [
    { value: '180K', label: 'In annual revenue' },
  ];

  return (
    <section style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
      {statsData.map((stat, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem' }}>{stat.value}</h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

// Plan component
const Plan = ({ type, isHighlighted }) => {
  const style = {
    padding: '130px', // Increased padding for bigger card
    border: isHighlighted ? 'none' : '1px solid #ddd',
    borderRadius: '12px', // Slightly rounded corners
    backgroundColor: isHighlighted ? '#0d7aa6' : '#f8f9fa',
    color: isHighlighted ? '#fff' : '#000',
    width: '30rem', // Increased width for bigger cards
    height: '7rem', // Increased height for bigger cards
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Smooth hover effect
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
  };

  return (
    <div style={style} className={`plan ${type.toLowerCase()}`}>
      <h4>{type}</h4>
    </div>
  );
};


// Main Donation component
const Donation = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Header />
      <Stats />
      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
  <h3 style={{ marginBottom: '20px' }}>Select Your Action:</h3>
  <div className="plan-container">
    <div className="plan donate">
      <h4>Donate</h4>
    </div>
    <div className="plan check-donations">
      <h4>Check Donations</h4>
    </div>
  </div>
</section>

    </div>
  );
};

export default Donation;
