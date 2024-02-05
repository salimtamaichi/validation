import React, { useState } from "react";
import Form5 from './Form5'; // Importa el componente Form5
import './Form.css'; // Asegúrate de importar el archivo CSS para estilos

const NetflixForm = () => {
  const [plan, setPlan] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [planError, setPlanError] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
    setPlanError(""); // Limpiar el mensaje de error cuando se selecciona un plan
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que se haya seleccionado un plan utilizando la validación nativa del navegador
    if (!event.target.plan.checkValidity()) {
      setPlanError("Por favor, selecciona un plan válido.");
      return;
    }

    // Aquí puedes realizar acciones adicionales al enviar el formulario
    console.log("Formulario enviado");

    // Cambiar al Formulario 5 al establecer el estado correspondiente
    setFormCompleted(true);
  };

  // Renderizar Form5 si el formulario está completado
  if (formCompleted) {
    return <Form5 />;
  }

  return (
    <form className="netflix-form" onSubmit={handleSubmit}>
      <div>
        <h1>Registro de Netflix</h1>

        <div>
          <label htmlFor="plan">Plan</label>
          <select name="plan" id="plan" value={plan} onChange={handlePlanChange} required>
            <option value="">Selecciona un plan</option>
            <option value="basic">Básico</option>
            <option value="standard">Estándar</option>
            <option value="premium">Premium</option>
          </select>
          {planError && <p className="error">{planError}</p>}
        </div>

        <button type="submit">Registrarse</button>
      </div>
    </form>
  );
}

export default NetflixForm;
