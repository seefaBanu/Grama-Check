import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Linking } from 'react-native';
import { H2, H1, H4 } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

export default function ({ navigation, route }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />

        <View style={styles.content}>
          <View style={styles.descContainer}>
            <H2 style={{ ...styles.text, marginTop: 15 }}>
              {user.user.firstName} {user.user.lastName}
            </H2>
            <H4
              style={{ ...styles.text, ...styles.description, marginBottom: 0 }}
            >
              {user.user.email}
            </H4>
            <H4 style={{ ...styles.text, ...styles.description }}>
              {user.user.nic}
            </H4>
            <Button
              size='big'
              color='shadedWarning'
              title='Edit Profile'
              onPress={() =>
                Linking.openURL('https://myaccount.asgardeo.io/t/interns')
              }
            />
            <Button
              size='big'
              color='shadedDanger'
              title='Log Out'
              onPress={() => {
                logout();
              }}
            />
          </View>
        </View>
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
    width: '40%',
    height: '100%',
  },
});
