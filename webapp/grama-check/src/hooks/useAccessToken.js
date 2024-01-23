import { useState, useEffect } from 'react';

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState('');

  const getToken = async () => {
    const orgName = 'interns';
    const clientID = '728m0XamjELUemdnAmAy17q7Feca';
    const clientSecret = 'QWi9TRUzxVof0Jowp82KmDdvlSZpE5il3pTKdlVCpW0a';
    const scope = 'profile openid';
  
    const tokenEndpoint = `https://api.asgardeo.io/t/${orgName}/oauth2/token`;
  
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
    });
  
    const body = new URLSearchParams({
      'grant_type': 'client_credentials',
      'scope': scope,
    });

  try {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Failed to retrieve access token: ${response.statusText}`);
    }

    const data = await response.json();
    const accessToken = data.access_token;

    console.log('Access Token:', accessToken);
    setAccessToken(accessToken);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

  useEffect(() => {
    getToken();
  }, []); 
  
  return accessToken;
};

export default useAccessToken;
