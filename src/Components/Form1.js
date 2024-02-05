// Form1.jsx
import React, { useState } from 'react';
import Form2 from './Form2';
import Form3 from './Form3';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import './Form.css';

const Form1 = () => {
  const [formStep, setFormStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nameValidation, setNameValidation] = useState({ valid: true, message: '' });
  const [emailValidation, setEmailValidation] = useState({ valid: true, message: '' });
  const [selectedCount, setSelectedCount] = useState(0);

  const notify = (message, type) => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    if (type === 'success') {
      toast.success(message, toastOptions);
    } else if (type === 'error') {
      toast.error(message, toastOptions);
    }
  };

  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNameBlur();
    handleEmailBlur();

    if (nameValidation.valid && emailValidation.valid && selectedCount === 2) {
      notify('Formulari enviat amb èxit!', 'success');
      handleNext();
    } else {
      notify('Hi ha errors en el formulari. Si us plau, revisa els camps.', 'error');
    }
  };

  const handleValidation = (value, validationFunction, setValidation) => {
    const isValid = validationFunction(value);
    setValidation({
      valid: isValid,
      message: isValid ? '' : 'Invalid input.',
    });
  };

  const handleNameBlur = () => {
    handleValidation(name, (value) => value.length >= 3 && value.length <= 5, setNameValidation);
  };

  const handleEmailBlur = () => {
    handleValidation(email, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), setEmailValidation);
  };

  const handleCheckboxChange = (isChecked, setCheckbox, setSelectedCount) => {
    setCheckbox(!isChecked);
    setSelectedCount(isChecked ? selectedCount - 1 : selectedCount + 1);
  };

  return (
    <div>
      {formStep === 1 && (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>Nom (3-5 lletres): </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              className={nameValidation.valid ? 'valid-input' : 'invalid-input'}
            />
            {nameValidation.message && (
              <span className="validation-message">{nameValidation.message}</span>
            )}
          </div>
          <div>
            <label>Email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className={emailValidation.valid ? 'valid-input' : 'invalid-input'}
            />
            {emailValidation.message && (
              <span className="validation-message">{emailValidation.message}</span>
            )}
          </div>
          <div>
            <label>Checkbox:</label>
            <input
              type="checkbox"
              checked={check1}
              onChange={() => handleCheckboxChange(check1, setCheck1, setSelectedCount)}
            />
            Check1
            <input
              type="checkbox"
              checked={check2}
              onChange={() => handleCheckboxChange(check2, setCheck2, setSelectedCount)}
            />
            Check2
            <input
              type="checkbox"
              checked={check3}
              onChange={() => handleCheckboxChange(check3, setCheck3, setSelectedCount)}
            />
            Check3
            {selectedCount === 2 ? (
              <span className="selected-count">✅</span>
            ) : (
              <span className="selected-count">❌</span>
            )}
          </div>
          <div>
            <label>Select:</label>
            <Select
              isMulti
              value={selectedOptions}
              options={[
                { label: 'Opcio1', value: 'Opcio1' },
                { label: 'Opcio2', value: 'Opcio2' },
                { label: 'Opcio3', value: 'Opcio3' },
                { label: 'Opcio4', value: 'Opcio4' },
              ]}
              onChange={(selected) => {
                setSelectedOptions(selected);
              }}
            />
          </div>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      )}
      {formStep === 2 && <Form2 onNext={handleNext} />}
      {formStep === 3 && <Form3 />}
      <ToastContainer />
    </div>
  );
};

export default Form1;
