// Footer.jsx
import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        {/* Logo Section */}
        <div style={styles.footerLogo}>
          <h2 style={styles.logoText}>Explore</h2>
        </div>

        {/* Links Section */}
        <div style={styles.footerLinks}>
          {/* Donations Column */}
          <div style={styles.footerColumn}>
            <h3 style={styles.columnTitle}>Donations</h3>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>Food Donation</li>
              <li style={styles.linkItem}>Shelter Partners</li>
              <li style={styles.linkItem}>How to Donate</li>
              <li style={styles.linkItem}>FAQs</li>
            </ul>
          </div>

          {/* Resources Column */}
          <div style={styles.footerColumn}>
            <h3 style={styles.columnTitle}>Resources</h3>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>Recipes</li>
              <li style={styles.linkItem}>Guides</li>
              <li style={styles.linkItem}>Nutrition Tips</li>
            </ul>
          </div>

          {/* About Column */}
          <div style={styles.footerColumn}>
            <h3 style={styles.columnTitle}>About Us</h3>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>Our Mission</li>
              <li style={styles.linkItem}>Team</li>
              <li style={styles.linkItem}>Contact</li>
            </ul>
          </div>

          {/* Social Icons Column */}
          <div style={styles.footerColumn}>
            <h3 style={styles.columnTitle}>Follow Us</h3>
            <div style={styles.socialIcons}>
              <FaTwitter style={styles.icon} />
              <FaLinkedin style={styles.icon} />
              <FaFacebook style={styles.icon} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.footerBottom}>
        <p style={styles.bottomText}>©  2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

// Styles for Footer component
const styles = {
  footer: {
    backgroundColor: '#f4f7f8',
    color: '#1f2933',
    padding: '40px 0',
    textAlign: 'center',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerLogo: {
    marginBottom: '20px',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '800px',
    flexWrap: 'wrap',
  },
  footerColumn: {
    margin: '10px',
    minWidth: '150px',
  },
  columnTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
  },
  linkItem: {
    margin: '5px 0',
    color: '#5b6a75',
    cursor: 'pointer',
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    fontSize: '1.2rem',
    color: '#5b6a75',
    cursor: 'pointer',
  },
  footerBottom: {
    marginTop: '20px',
    borderTop: '1px solid #e5e7eb',
    paddingTop: '10px',
    color: '#5b6a75',
    fontSize: '0.9rem',
  },
  bottomText: {
    margin: 0,
  },
};

export default Footer;
