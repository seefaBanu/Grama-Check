import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from '@asgardeo/auth-react';

const config = {
  // signInRedirectURL: "localhost:5173",
  signInRedirectURL: "https://c6313fcb-3c26-424b-b361-1141edab3fb8.e1-us-east-azure.choreoapps.dev",
  // signOutRedirectURL: "http://localhost:5173",
  clientID: "4pvNZCwIhW_ZDY9b3PlkWWcy3vsa",
  baseUrl: "https://api.asgardeo.io/t/interns",
  scope : ["openid", "profile", "email", "urn:interns:gcgeneralservicegeneral:grama"],
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
