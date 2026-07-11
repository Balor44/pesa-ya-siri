import React from 'react';
import ReactDOM from 'react-dom/client';
import PesaYaSiriLanding from './PesaYaSiriLanding';
import Waitlist from './Waitlist';

const path = window.location.pathname;

const App = () => {
  if (path === '/waitlist') return <Waitlist />;
  return <PesaYaSiriLanding />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);