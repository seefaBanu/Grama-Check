import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from '@asgardeo/auth-react'

const config = {
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "1fui_PW5siWfEY78q3yeKsgRgMYa",
  baseUrl: "https://api.asgardeo.io/t/gramacheckorg",
  scope : ["openid", "profile"],
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
   <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
