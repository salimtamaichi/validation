import React, { useState } from 'react';
import FormDataDisplay from './FormDataDisplay';
import './Form.css';

const Form5 = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const [formCompleted, setFormCompleted] = useState(false);
  const [formData, setFormData] = useState({});
  const [showFormDataDisplay, setShowFormDataDisplay] = useState(false);
  const [cardType, setCardType] = useState(null);

  const validateForm = () => {
    let valid = true;

    // Validar nombre
    if (!firstName || firstName.length < 3 || /\d/.test(firstName)) {
      setFirstNameError('El nombre debe tener al menos 3 caracteres y no puede contener números.');
      valid = false;
    } else {
      setFirstNameError('');
    }

    // Validar apellidos
    if (lastName && (lastName.length < 1 || /\d/.test(lastName))) {
      setLastNameError('Los apellidos deben tener al menos un carácter y no pueden contener números.');
      valid = false;
    } else {
      setLastNameError('');
    }

    // Validar número de tarjeta y determinar el tipo
    const cardNumberPrefix = cardNumber.replace(/\s/g, '').slice(0, 2);

    if (cardNumberPrefix.match(/^4/)) {
      setCardType('visa');
    } else if (cardNumberPrefix.match(/^5[1-5]/)) {
      setCardType('mastercard');
    } else if (cardNumberPrefix.match(/^3[47]/)) {
      setCardType('american-express');
    } else {
      setCardType(null);
    }

    if (!cardNumber || !isValidCreditCard(cardNumber)) {
      setCardNumberError('Número de tarjeta inválido.');
      valid = false;
    } else {
      setCardNumberError('');
    }

    // Validar fecha de vencimiento
    const currentYear = new Date().getFullYear();
    const expirationYearInt = parseInt(expirationYear, 10);

    if (
      isNaN(expirationYearInt) ||
      expirationYearInt < currentYear ||
      expirationYearInt > currentYear + 25
    ) {
      setExpirationDateError('Año de vencimiento inválido.');
      valid = false;
    } else {
      setExpirationDateError('');
    }

    // Validar CVV
    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      setCvvError('CVV inválido. Debe contener 3 o 4 dígitos.');
      valid = false;
    } else {
      setCvvError('');
    }

    return valid;
  };

  const isValidCreditCard = (number) => {
    // Utilizar alguna lógica de validación de tarjeta de crédito aquí
    // En este ejemplo, solo se verifica que el número no esté vacío
    return !!number;
  };

  const handleNextClick = () => {
    // Obtener los elementos del formulario
    const formElements = document.forms[0].elements;

    // Validar cada elemento del formulario utilizando checkValidity
    for (let i = 0; i < formElements.length; i++) {
      if (!formElements[i].checkValidity()) {
        // Si algún elemento no es válido, mostrar el mensaje de error correspondiente
        switch (formElements[i].name) {
          case 'firstName':
            setFirstNameError('El nombre debe tener al menos 3 caracteres y no puede contener números.');
            break;
          case 'lastName':
            setLastNameError('Los apellidos deben tener al menos un carácter y no pueden contener números.');
            break;
          case 'cardNumber':
            setCardNumberError('Número de tarjeta inválido.');
            break;
          case 'expirationMonth':
          case 'expirationYear':
            setExpirationDateError('Fecha de vencimiento inválida.');
            break;
          case 'cvv':
            setCvvError('CVV inválido. Debe contener 3 o 4 dígitos.');
            break;
          default:
            break;
        }
        return;
      }
    }

    // Si todos los elementos son válidos, continuar con el proceso
    console.log('Formulario válido, siguiente paso.');
    // Mostrar el Formulario de visualización de datos al establecer el estado correspondiente
    setFormCompleted(true);
    setFormData({
      firstName,
      lastName,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
    });
    setShowFormDataDisplay(true); // Cambia el estado para mostrar FormDataDisplay
  };

  // Renderizar el Formulario de visualización de datos si el formulario está completado
  if (showFormDataDisplay) {
    return <FormDataDisplay data={formData} />;
  }

  return (
    <div className="form-container">
      <h2>Formulario 5</h2>
      <div className={`input-container ${firstNameError ? 'error' : 'valid'}`}>
        <label>Nombre:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {firstNameError && <p className="error">{firstNameError}</p>}
      </div>
      <div className={`input-container ${lastNameError ? 'error' : 'valid'}`}>
        <label>Apellidos:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {lastNameError && <p className="error">{lastNameError}</p>}
      </div>
      <div className={`input-container ${cardNumberError ? 'error' : 'valid'}`}>
        <label>Número de tarjeta:</label>
        <input
          type="text"
          name="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        {cardNumberError && <p className="error">{cardNumberError}</p>}
      </div>
      <div className={`input-container ${expirationDateError ? 'error' : 'valid'}`}>
        <label>Fecha de vencimiento:</label>
        <div className="expiration-date-container">
          <input
            type="text"
            name="expirationMonth"
            placeholder="Mes"
            value={expirationMonth}
            onChange={(e) => setExpirationMonth(e.target.value)}
            required
          />
          <input
            type="text"
            name="expirationYear"
            placeholder="Año"
            value={expirationYear}
            onChange={(e) => setExpirationYear(e.target.value)}
            required
          />
        </div>
        {expirationDateError && <p className="error">{expirationDateError}</p>}
      </div>
      <div className={`input-container ${cvvError ? 'error' : 'valid'}`}>
        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        {cvvError && <p className="error">{cvvError}</p>}
      </div>
      <div className="credit-card-image-container">
        {cardType && (
          <img
            src={`path/to/${cardType}.png`} // Ruta de la imagen para cada tipo de tarjeta
            alt={`Tarjeta ${cardType}`}
            style={{ width: '50px', height: '30px' }} // Estilo de la imagen
          />
        )}
      </div>
      <button className="next-button" onClick={handleNextClick}>
        Siguiente
      </button>
    </div>
  );
};

export default Form5;
