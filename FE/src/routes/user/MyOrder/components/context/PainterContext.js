import React, { createContext } from 'react';

// define list of colors
export const colors = [
  { name: 'white', hex: '#fff' },
  { name: 'black', hex: '#000' },
  { name: 'red', hex: '#e74c3c' },
  { name: 'green', hex: '#27ae60' },
  { name: 'blue', hex: '#2980b9' },
  { name: 'pink', hex: '#ffa6c9' },
  { name: 'yellow', hex: '#f1c40f' },
  { name: 'midnightblue', hex: '#2c3e50' },
  { name: 'carrot', hex: '#e67e22' },
  { name: 'purple', hex: '#9b59b6' },
];

// create painter context
// make the first color its default value
export const PainterContext = createContext();
