import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from '@asgardeo/auth-react'

const config = {
  signInRedirectURL: "localhost:5173",
  // signOutRedirectURL: "http://localhost:5173",
  clientID: "OoXOfHIW8C8fcft8ouqJtVCgaVwa",
  baseUrl: "https://api.asgardeo.io/t/interns",
  scope : ["openid", "profile", "email"],
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
   <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
