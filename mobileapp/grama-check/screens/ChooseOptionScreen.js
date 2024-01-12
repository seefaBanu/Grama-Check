import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { H2, H1, H4 } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';

export default function ({ navigation, route }) {
  return (
    <View style={styles.screen}>
      {/* <ImageBackground
        source={require('../../assets/start3.jpg')}
        style={styles.bgImage}
        resizeMode='cover'
      > */}
      <View style={styles.content}>
        <View style={styles.descContainer}>
          <H2 style={{ ...styles.text, marginTop: 15 }}>GramaCheck</H2>
          <H4 style={{ ...styles.text, ...styles.description }}>
            Request your Grama Niladari Certificates.
          </H4>
          <Button
            size='big'
            color='shadedPrimary'
            title='Submit New Request'
            onPress={() => navigation.navigate('NewRequestScreen')}
          />
          {/* <Button
            size='big'
            color='shadedPrimary'
            title='Track Your Request'
            onPress={() => navigation.navigate('GetStartedScreen')}
          /> */}
          <Button
            size='big'
            color='shadedWarning'
            title='My Account'
            onPress={() => {}}
          />
        </View>
      </View>

      {/* </ImageBackground> */}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
