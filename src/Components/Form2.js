// Form2.jsx
import React, { useState } from 'react';

const Form2 = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState({ valid: true, message: '' });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isValid = e.target.validity.valid;
    setEmailValidation({
      valid: isValid,
      message: isValid ? '' : 'Correo electrónico no válido.',
    });
  };

  const handleNextClick = () => {
    if (emailValidation.valid) {
      onNext();
    }
  };

  return (
    <div>
      <h2>Formulario 2</h2>
      <form onSubmit={(e) => e.preventDefault()} noValidate action='Form3.js'>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={emailValidation.valid ? 'valid-input' : 'invalid-input'}
            required
          />
          {emailValidation.message && (
            <span className="validation-message">{emailValidation.message}</span>
          )}
        </div>
        <div>
          <button type="button" onClick={handleNextClick}>
            Empezar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form2;
