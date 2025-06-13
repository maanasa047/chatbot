import React, { useState } from 'react';

const services = [
  {
    name: 'Aadhaar',
    documents: ['Proof of Identity', 'Proof of Address', 'Birth Certificate'],
    eligibility: 'Resident of India with valid proof',
    link: 'https://uidai.gov.in',
  },
  {
    name: 'PAN',
    documents: ['Proof of Identity', 'Date of Birth proof', 'Photograph'],
    eligibility: 'Any Indian citizen or taxpayer',
    link: 'https://www.incometax.gov.in/iec/foportal',
  },
  {
    name: 'Passport',
    documents: ['Aadhaar', 'Utility Bill', 'Birth Certificate'],
    eligibility: 'Citizen of India',
    link: 'https://passportindia.gov.in',
  },
  {
    name: 'Driving Licence',
    documents: ['Passport size photo', 'Address proof', 'Age-Proof'],
    eligibility: 'Indian Citizen equal or above 18',
    link: 'https://parivahan.gov.in/parivahan/',
  },
  {
    name: 'Birth Certificate',
    documents: ['Proof of Birth from Hospital', 'Parents ID Proofs', 'Parents Marriage Certificate'],
    eligibility: 'Register within 21 days of birth',
    link: 'https://www.ghmc.gov.in/Birth.aspx',
  },
  {
    name: 'VoterID',
    documents: ['Passport Photo', 'Address Proof', 'Age Proof', 'Identity Proof'],
    eligibility: 'Indian citizen aged 18+',
    link: 'https://voters.eci.gov.in/',
  },
  {
    name: 'Ration Card',
    documents: ['Application Form', 'Address Proof', 'ID Proof', 'Passport Photo'],
    eligibility: 'Annual income < 3 Lakhs',
    link: 'https://epds.telangana.gov.in/FoodSecurityAct/',
  },
  {
    name: 'Marriage Certificate',
    documents: ['Age Proof', 'Address Proof', 'Wedding Invitation (if available)'],
    eligibility: 'Groom 21+, Bride 18+, mutual consent',
    link: 'https://registration.telangana.gov.in/marriageRegistration.htm',
  },
  {
    name: 'Death Certificate',
    documents: ['Application Form', 'Proof of Birth', 'Ration Card Copy', 'Medical Certificate'],
    eligibility: 'Report death within 21 days',
    link: 'https://ts.meeseva.telangana.gov.in/meeseva/',
  },
  {
    name: 'Income Certificate',
    documents: ['ID Proof', 'Address Proof', 'Proof of Income', 'Photo', 'Affidavit'],
    eligibility: 'Resident of area + income proof',
    link: 'https://ts.meeseva.telangana.gov.in/meeseva/home.htm',
  },
  {
    name: 'EPFO',
    documents: ['Aadhaar Card', 'GST Certificate', 'Lease Agreement', 'License Proof'],
    eligibility: 'Salary ≤ ₹15,000/month, in 20+ employee org',
    link: 'https://www.epfindia.gov.in/site_en/index.php',
  },
  {
    name: 'ESIC',
    documents: ['GST Certificate', 'Lease Agreement', 'License Proof', 'Employee Details'],
    eligibility: 'Wage ≤ ₹21,000 and ESI-registered org',
    link: 'https://esicstaging.esic.in/ESICInsurance1/ESICInsurancePortal/Signup.aspx',
  },
];

const TryChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome! Ask me about Aadhaar, PAN, Passport or any other government service.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const lower = input.toLowerCase();
    const match = services.find((s) => lower.includes(s.name.toLowerCase()));
    let reply;

    if (match) {
      reply = `📌 ${match.name} Details:\n📄 Documents: ${match.documents.join(', ')}\n✅ Eligibility: ${match.eligibility}\n🔗 Site: ${match.link}`;
    } else {
      reply = "❓ Sorry, I couldn't find that service. Try Aadhaar, PAN, Passport, etc.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 500);

    setInput('');
  };

  return (
    <div style={styles.container}>
      <h2>Try Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? '#e1f5fe' : '#f1f1f1',
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> <br />
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', maxWidth: '600px', margin: 'auto' },
  chatBox: {
    background: '#fff',
    padding: '15px',
    height: '350px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  message: {
    padding: '10px 14px',
    borderRadius: '6px',
    maxWidth: '85%',
    whiteSpace: 'pre-line',
    fontSize: '0.95rem',
  },
  inputArea: { marginTop: '15px', display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  button: {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default TryChat;
