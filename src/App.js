import React, { useState } from 'react';
import Form1 from './Components/Form1';
import Form2 from './Components/Form2';
import Form3 from './Components/Form3';
import Form4 from './Components/Form4';
import Form5 from './Components/Form5';
import FormDataDisplay from './Components/FormDataDisplay'; // Importa el nuevo componente

function App() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    if (formStep < 4) {
      setFormStep((prevStep) => prevStep + 1);
    } else {
      setFormData(data);
    }
  };

  return (
    <div className="App">
      <h1>Formulari React amb Validacions</h1>
      {(
        <>
          {formStep === 1 && <Form1 onSubmit={handleFormSubmit} />}
          {formStep === 2 && <Form2 onSubmit={handleFormSubmit} />}
          {formStep === 3 && <Form3 onSubmit={handleFormSubmit} />}
          {formStep === 4 && <Form4 onSubmit={handleFormSubmit} />}
          {formStep === 5 && <Form5 onSubmit={handleFormSubmit} />}
        </>
      )}

    </div>
  );
}

export default App;
