import React, { useState, useEffect } from 'react';
import './App.css'; // Убедитесь, что путь правильный
import NQueens from './components/n-queen/NQueen';

// Главный компонент приложения
const App = () => {
  return (
    <NQueens />
  );
};

export default App;
