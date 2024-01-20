import React, { useCallback, useContext } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { H2, H1, H4 } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import RefreshView from '../components/RefreshView';
import env from '../constants/env';
import { AuthContext } from '../context/AuthContext';
export default function ({ navigation, route }) {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = React.useState(false);
  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `${env.backend}/user/certificate/${user.user.email}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (response.status == 401 || response.status == 403) {
        logout();
      }
      if (response.status == 404) {
        setData(false);
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      setData(true);
      return;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <RefreshView getData={getData} route={route}>
          <View style={styles.content}>
            <View style={styles.descContainer}>
              <View style={styles.gLogoContainer}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.logo}
                />
              </View>
              <H4 style={{ ...styles.text, ...styles.description }}>
                Request your Grama Niladari Certificates.
              </H4>
              {!data ? (
                <Button
                  size='big'
                  color='shadedPrimary'
                  title='Submit New Request'
                  onPress={() => navigation.navigate('NewRequestScreen')}
                />
              ) : (
                <Button
                  size='big'
                  color='shadedPrimary'
                  title='Track Your Request'
                  onPress={() => navigation.navigate('RequestStatusScreen')}
                />
              )}
              <Button
                size='big'
                color='shadedWarning'
                title='My Account'
                onPress={() => navigation.navigate('MyAccountScreen')}
              />
            </View>
          </View>
        </RefreshView>
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
    width: 250,
    height: '100%',
    alignSelf: 'center',
  },
  gLogoContainer: {
    width: '100%',
    alignItems: 'center',
    height: 70,
  },
});
