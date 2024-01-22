import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import { H2, H1, H4 } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();
import {
  CLIENT_ID,
  TOKEN_ENDPOINT,
  redirectUri,
  AuthContext,
} from '../context/AuthContext';

export default function ({ navigation, route }) {
  const discovery = AuthSession.useAutoDiscovery(TOKEN_ENDPOINT);
  const { saveAuth } = useContext(AuthContext);
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
    <SafeAreaView>
      <View style={styles.screen}>
        {/* <ImageBackground
        source={require('../../assets/start3.jpg')}
        style={styles.bgImage}
        resizeMode='cover'
      > */}
        <View style={styles.content}>
          <View style={styles.descContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/homescreen.png')}
                style={styles.mainImage}
              />
            </View>
            <View style={styles.gLogoContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
              />
            </View>
            <H4 style={{ ...styles.text, ...styles.description }}>
              Request your Grama Niladari Certificates.
            </H4>
            <Button
              size='big'
              color='filledPrimary'
              title='Sign in with Asgardeo'
              onPress={() => promptAsync()}
            />
          </View>
        </View>
        <View style={styles.logoFooter}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/SLEmblem.png')}
              style={styles.footerLogo}
            />
            <Image
              source={require('../assets/choreo.png')}
              style={styles.footerLogo}
            />
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>
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
    alignItems: 'center',
  },
  logoFooter: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  imageContainer: {
    // width: '80%',
    // height: 70,
    height: '50%',
    width: '100%',
    justifyContent: 'center',
  },
  gLogoContainer: {
    width: 250,
    height: 70,
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
    width: '100%',
    height: '100%',
  },
  footerLogo: {
    resizeMode: 'contain',
    width: '40%',
    height: '100%',
  },
});
