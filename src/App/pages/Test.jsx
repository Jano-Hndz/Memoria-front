
import React, { useState } from 'react';

export const Test = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://localhost:4000/api/profesor/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
      } else {
        console.error('Error al subir archivo');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
    // Aquí puedes enviar formData al backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Subir archivo</button>
    </form>
  );
}

