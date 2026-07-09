import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import '@fontsource/raleway/latin-400.css';
import '@fontsource/raleway/latin-500.css';
import '@fontsource/raleway/latin-600.css';
import '@fontsource/raleway/latin-700.css';
import '@fontsource/raleway/latin-800.css';
// Legacy auth/form styling. The fonctionnality_bases branch loads this globally
// (its App eagerly imports Register, which imports this file), so several legacy
// pages rely on its global `header`, `.container`, `.form` rules. Import it here
// so those pages render identically; legacy-reference.css follows to keep the
// app background tokenized rather than the login-screen orange.
import '../public/css/loginSingup.css';
import './styles/legacy-reference.css';

import App from './app/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Unable to find the root element.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
