import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bulma/css/bulma.css';
import './styles/style.css';
import "./styles/layout.css";

// Supaya dapat mengirimkan cookie secara otomatis
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);