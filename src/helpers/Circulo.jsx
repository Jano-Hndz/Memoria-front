import React from 'react';
import './Circulo.css'; // Archivo CSS para estilos

const Circulo = ({ color }) => {
  return (
    <div className={`circulo ${color}`}></div>
  );
};

export default Circulo;
