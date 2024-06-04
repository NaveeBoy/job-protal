import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const AboutUs = () => {
  return (
    <>
    <Navbar></Navbar>
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to QuickJobs</h1>
        <p style={styles.description}>
          QuickJobs is your go-to platform for finding the perfect job or hiring top talent. Whether you're a job seeker or a company looking to fill positions, we've got you covered.
        </p>
        <h2 style={styles.subHeading}>Our Mission</h2>
        <p style={styles.description}>
          Our mission is to connect skilled professionals with rewarding opportunities. We believe that the right job can transform lives, and the right employee can drive business success.
        </p>
        <h2 style={styles.subHeading}>Job Categories</h2>
        <p style={styles.description}>
          QuickJobs offers a wide range of job categories, including:
          <ul style={styles.list}>
            <li>Technology</li>
            <li>Finance</li>
            <li>Healthcare</li>
            <li>Marketing</li>
            <li>Engineering</li>
            
            
          </ul>
          and more ......
        </p>
        <h2 style={styles.subHeading}>Meet the Team</h2>
        <p style={styles.description}>
          Our dedicated team of administrators ensures that QuickJobs runs smoothly. From managing job postings to assisting users, we're here to help.
        </p>
        <h2 style={styles.subHeading}>Contact Us</h2>
        <p style={styles.description}>
          Have questions or feedback? Reach out to us at info@quickjobs.com.
        </p>
      </div>
      {/* Add your logo here */}
      <img src="/logo.jpg" alt="QuickJobs Logo" style={styles.logo} />
    </div>
    <Footer/>
    </>
  );
};

const styles = {
    container: {
      maxWidth: '100%',
      marginLeft: '50px ',
      padding: '0px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'space-between', // Aligns content to left and logo to right
    },
    content: {
      flex: 1,
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    subHeading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginTop: '30px',
    },
    description: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
    list: {
      listStyleType: 'disc',
      marginLeft: '20px',
    },
    logo: {
        marginTop:"200px",
        height:"400px",
        width:"400px",
    },
  };

export default AboutUs;
