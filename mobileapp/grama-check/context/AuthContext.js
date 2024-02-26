import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import * as AuthSession from 'expo-auth-session';
import 'core-js/stable/atob';
import { Linking } from 'react-native';

export const AuthContext = createContext(null);
export const TOKEN_ENDPOINT = 'https://api.asgardeo.io/t/interns/oauth2/token';
export const redirectUri = AuthSession.makeRedirectUri();
export const CLIENT_ID = '4pvNZCwIhW_ZDY9b3PlkWWcy3vsa';
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const checkAuth = async function () {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const userData = await SecureStore.getItemAsync('userData');
      if (accessToken != null && userData != null) {
        setUser({ accessToken, user: JSON.parse(userData) });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log('checkAuth: ', err);
      setUser(null);
    }
  };
  React.useEffect(() => {
    checkAuth();
  }, []);
  const saveAuth = async function (accessToken, idToken) {
    try {
      const decodedIdToken = jwtDecode(idToken);
      SecureStore.setItemAsync('accessToken', accessToken);
      SecureStore.setItemAsync(
        'userData',
        JSON.stringify({
          firstName: decodedIdToken.given_name,
          lastName: decodedIdToken.family_name,
          email: decodedIdToken.email,
          nic: decodedIdToken.nic,
        })
      );
      setUser({
        accessToken,
        user: {
          firstName: decodedIdToken.given_name,
          lastName: decodedIdToken.family_name,
          email: decodedIdToken.email,
          nic: decodedIdToken.nic,
        },
      });
    } catch (err) {
      console.log('save auth: ', err);
    }
  };
  const logout = async function () {
    try {
      Linking.openURL(
        `https://api.asgardeo.io/t/interns/oidc/logout?client_id=${CLIENT_ID}&post_logout_redirect_uri=${redirectUri}`
      );
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('userData');
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider value={{ user, logout, saveAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
