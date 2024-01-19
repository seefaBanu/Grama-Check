import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from '@asgardeo/auth-react'

const config = {
  signInRedirectURL: "https://d1564641-642d-44ad-a5a8-42ec4eac6897.e1-us-east-azure.choreoapps.dev",
  signOutRedirectURL: "https://d1564641-642d-44ad-a5a8-42ec4eac6897.e1-us-east-azure.choreoapps.dev",
  clientID: "QRt1ft6oA6zARjMdOX4zZvMpMfga",
  baseUrl: "https://api.asgardeo.io/t/interns ",
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
