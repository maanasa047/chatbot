const sendMessage = async () => {
  if (!input.trim()) return;

  const userText = input.toLowerCase();
  setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);

  const responses = {
    aadhaar: 'To apply for Aadhaar, you need proof of identity, address, and birth. Visit: https://uidai.gov.in',
    pan: 'To apply for a PAN card, you need ID proof, DOB proof, and a photograph. Visit: https://www.incometax.gov.in/iec/foportal',
    passport: 'For a passport, submit Aadhaar, utility bill, and birth certificate. Visit: https://passportindia.gov.in',
    driving: 'To get a Driving Licence, provide passport photo, address and age proof. Visit: https://parivahan.gov.in/parivahan/',
    birth: 'Birth Certificate requires hospital proof, parents ID, and marriage certificate. Visit: https://www.ghmc.gov.in/Birth.aspx',
    death: 'Death Certificate requires hospital proof, ID and ration card. Visit: https://ts.meeseva.telangana.gov.in/meeseva/',
    voter: 'VoterID requires age, address, and ID proof. Must be 18+. Visit: https://voters.eci.gov.in/',
    income: 'Income Certificate requires ID, address, income proof, and affidavit. Visit: https://ts.meeseva.telangana.gov.in/meeseva/',
    epfo: 'EPFO registration needs Aadhaar, GST, lease agreement, and ID. Visit: https://www.epfindia.gov.in/site_en/index.php',
    ration: 'Ration Card requires ID, address proof, and income below ₹3 lakhs. Visit: https://epds.telangana.gov.in/FoodSecurityAct/',
    esic: 'ESIC covers employees earning below ₹21,000 with valid documents. Visit: https://esicstaging.esic.in/ESICInsurance1/ESICInsurancePortal/Signup.aspx',
    marriage: 'Marriage Certificate requires age and address proof, and wedding invite. Visit: https://registration.telangana.gov.in/marriageRegistration.htm',
  };

  let reply = 'Sorry, I didn’t understand. Try asking about Aadhaar, PAN, or Passport.';

  for (const key in responses) {
    if (userText.includes(key)) {
      reply = responses[key];
      break;
    }
  }

  setTimeout(() => {
    setMessages((msgs) => [...msgs, { sender: 'bot', text: reply }]);
  }, 500);

  setInput('');
};
