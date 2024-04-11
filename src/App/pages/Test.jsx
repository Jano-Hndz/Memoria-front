

import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Pagination, PaginationItem } from '@mui/material';

export const Test = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  const totalItems = 20; // Número total de elementos

  // Calcular el rango de elementos a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Simular una lista de elementos
  const items = Array.from({ length: totalItems }, (_, index) => `Elemento ${index + 1}`);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(value);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Elementos ({totalItems} en total)
      </Typography>

      {/* Renderizar la lista de elementos basada en la página actual */}
      <List>
        {items.slice(startIndex, endIndex).map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      {/* Paginación */}
      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)} // Calcular el número total de páginas
        page={currentPage}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            component="div"
            {...item}
          />
        )}
      />
    </div>
  );
};
