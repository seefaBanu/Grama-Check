import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { H2, H1, H4 } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();
import { CLIENT_ID, TOKEN_ENDPOINT, redirectUri, useAuth } from '../auth';

export default function ({ navigation, route }) {
  const discovery = AuthSession.useAutoDiscovery(TOKEN_ENDPOINT);
  const { saveAuth } = useAuth();
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: CLIENT_ID,
      responseType: 'code',
      scopes: ['openid', 'profile', 'email'],
    },
    discovery
  );
  const getAccessToken = async function () {
    if (result?.params?.code) {
      fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${result?.params?.code}&redirect_uri=${redirectUri}&client_id=${CLIENT_ID}&code_verifier=${request?.codeVerifier}`,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.access_token || !data.id_token)
            throw new Error('Authentication error');
          return saveAuth(data.access_token, data.id_token);
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  };
  useEffect(() => {
    (async function setResult() {
      if (result) {
        if (result.error) {
          Alert.alert(
            'Authentication error',
            result.params.error_description || 'Something went wrong'
          );
          return;
        }
        if (result.type === 'success') {
          getAccessToken();
        }
      }
    })();
  }, [result]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.bottomSheet}></View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descContainer: {
    width: '90%',
    // alignItems: 'center',
  },
  logoContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
  },
  text: {
    color: Theme.textColor,
    textAlign: 'center',
  },
  description: {
    marginBottom: 40,
  },
  mainImage: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
  },
  logo: {
    resizeMode: 'contain',
    width: '40%',
    height: '100%',
  },

  bottomSheet: {
    height: '100%', //change this after design it
    backgroundColor: 'read',
    width: '100%',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: 100,
  },

  container: {
    paddingTop: 10,
    backgroundColor: 'blue',
  },
});
