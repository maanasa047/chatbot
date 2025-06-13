import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    name: 'Aadhaar Card',
    documents: ['Proof of Identity', 'Proof of Address', 'Birth Certificate'],
    eligibility: 'Resident of India with valid proof',
    link: 'https://uidai.gov.in',
  },
  {
    id: 2,
    name: 'PAN Card',
    documents: ['Proof of Identity', 'Date of Birth proof', 'Photograph'],
    eligibility: 'Any Indian citizen or taxpayer',
    link: 'https://www.incometax.gov.in/iec/foportal',
  },
  {
    id: 4,
    name: 'Driving Licence',
    documents: ['Passport size photo', 'Address proof ', 'Age-Proof'],
    eligibility: 'Indian Citizen equal or above 18',
    link: 'https://parivahan.gov.in/parivahan/',
  },
  {
    id: 5,
    name: 'Birth Certificate',
    documents: ['Proof of Birth from Hospital', 'Parents ID Proofs,', 'Parents Marriage Certificate'],
    eligibility: 'Births must be registered within 21 days of the occurrence to avoid late registration fees.',
    link: 'https://www.ghmc.gov.in/Birth.aspx',
  },
  {
    id: 6,
    name: 'VoterID',
    documents: ['Passport Photo', 'Address Proof', 'Age Proof', 'Identity Proof'],
    eligibility: 'Indian citizen have attained the age of 18 years on the qualifying date i.e. 1 Jan, 1 April, 1 July',
    link: 'https://voters.eci.gov.in/',
  },
  {
    id: 7,
    name: 'Ration Card',
    documents: ['Application Form', 'Address Proof-Utility Bills', 'Identity Proof', 'Passport Photo and others'],
    eligibility: 'Annual Income less than 3 Lakhs',
    link: 'https://epds.telangana.gov.in/FoodSecurityAct/',
  },
  {
    id: 8,
    name: 'Marriage Certificate',
    documents: ['Age Proof', 'Address Proof', 'Wedding Invitation(if there) and others'],
    eligibility:
      'The groom must be at least 21 years old, and the bride must be at least 18 years old. Both parties must provide free consent for the marriage.',
    link: 'https://registration.telangana.gov.in/marriageRegistration.htm',
  },
  {
    id: 9,
    name: 'Death Certificate',
    documents: ['Application Form', 'Proof of Birth', 'Ration Card Copy', 'Medical Certificate of Cause of Death:'],
    eligibility: 'Death must be reported within 21 days',
    link: 'https://ts.meeseva.telangana.gov.in/meeseva/',
  },
  {
    id: 10,
    name: 'Income Certificate',
    documents: ['ID Proof', 'Address Proof', 'Proof of Income', 'Passport-size Photograph', 'Affidavit'],
    eligibility: 'Resident of Area and income proof',
    link: 'https://ts.meeseva.telangana.gov.in/meeseva/home.htm',
  },
  {
    id: 11,
    name: 'EPFO',
    documents: ['Aadhaar Card', 'GST Certificate', 'Leased Agreement', 'License Proof issued by the Identifier'],
    eligibility:
      'Employed in an organization with 20 or more employees, have a basic monthly salary of Rs. 15,000 or less',
    link: 'https://www.epfindia.gov.in/site_en/index.php',
  },
  {
    id: 12,
    name: 'ESIC',
    documents: ['GST Certificate', 'Leased Agreement', 'License Proof issued by the Identifier', 'Employee Details'],
    eligibility:
      'Employees working in establishments covered under the ESI Act and earning a monthly wage of up to ₹21,000 ',
    link: 'https://esicstaging.esic.in/ESICInsurance1/ESICInsurancePortal/Signup.aspx',
  },
];

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');

    if (!isLoggedIn || !storedUsername) {
      navigate('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  navigate('/');  // Redirect to PublicHome route after logout
};


  const toggleDetails = (service) => {
    setSelectedService((prev) => (prev?.id === service.id ? null : service));
  };


  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.profileBox}>
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            style={styles.avatar}
          />
          <h3 style={styles.username}>{username}</h3>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <button
          onClick={() => window.open('/chat', '_blank')}
          style={styles.chatButton}
        >
          Open Chat
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Welcome to Government Services Chatbot</h1>
        <p style={styles.description}>
          Easily access documents, eligibility, and links for 10+ Government Services.
        </p>

        <div style={styles.cardGrid}>
          {services.map((service) => (
            <div key={service.id} style={styles.card} onClick={() => toggleDetails(service)}>
              <h3>{service.name}</h3>
              {selectedService?.id === service.id && (
                <div style={styles.details}>
                  <strong>Documents Required:</strong>
                  <ul>
                    {service.documents.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                  <p><strong>Eligibility:</strong> {service.eligibility}</p>
                  <p>
                    <a href={service.link} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px',
  },
  profileBox: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  username: {
    fontSize: '1.1rem',
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: '10px',
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
  },
  chatButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '30px',
  },
  mainContent: {
    flexGrow: 1,
    padding: '40px',
    background: '#f4f6f8',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '10px',
  },
  description: {
    marginBottom: '30px',
    fontSize: '1.1rem',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: '0.3s',
  },
  details: {
    marginTop: '10px',
    textAlign: 'left',
    fontSize: '0.95rem',
  },
};

export default Home;
