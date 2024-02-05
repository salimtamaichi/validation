// Form3.jsx
import React, { useState } from 'react';
import './Form.css'; // Importa el archivo CSS para estilos
import Form4 from './Form4'; // Importa el componente Form4

const Form3 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  };

  const validateForm = () => {
    return document.getElementById('emailInput').checkValidity() && document.getElementById('passwordInput').checkValidity();
  };

  const handleNextClick = () => {
    if (validateForm()) {
      // Aquí puedes realizar acciones adicionales al hacer clic en "Siguiente"
      console.log('Formulario válido, siguiente paso.');
      setFormCompleted(true); // Marcar el formulario como completado
    } else {
      console.log('Formulario inválido, por favor corrige los errores.');
    }
  };

  // Renderizar Form4 si el formulario está completado
  if (formCompleted) {
    return <Form4 />;
  }

  return (
    <div className="form-container">
      <h2>Formulario 3</h2>
      <div className={`input-container ${emailError ? 'error' : 'valid'}`}>
        <label>Email:</label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <p className="error">{emailError}</p>}
      </div>
      <div className={`input-container ${passwordError ? 'error' : 'valid'}`}>
        <label>Password:</label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <button className="next-button" onClick={handleNextClick}>Siguiente</button>
    </div>
  );
};

export default Form3;
