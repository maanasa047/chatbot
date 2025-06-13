import React from 'react';
import { Link } from 'react-router-dom';

const PublicHome = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Government Services Chatbot</h1>
        <div style={styles.nav}>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </div>
      </header>

      <main style={styles.content}>
        <h2>Explore Government Services Effortlessly</h2>
        <p>Our chatbot helps you access documents, eligibility, and official links for 10+ government services.</p>

        <Link to="/try-chat" style={styles.tryChatButton}>Try Chat Without Login</Link>
      </main>
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center', background: '#f0f4f8', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  nav: { display: 'flex', gap: '15px' },
  link: { fontSize: '16px', color: '#007bff', textDecoration: 'none' },
  content: { marginTop: '50px' },
  tryChatButton: {
    marginTop: '30px',
    display: 'inline-block',
    background: '#007bff',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none'
  },
};

export default PublicHome;
