import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView } from 'react-native';
import { H2, H1, H4 } from '../components/Texts';
import { Button } from '../components/Buttons';
import { StatusBar } from "expo-status-bar";

import Theme from '../constants/theme';

export default function ({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}></View>
      </SafeAreaView>
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
    height: "100%", //change this after design it
    backgroundColor: "read",
    width: "100%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: 100,
  },

  container: {
    paddingTop: 10,
    backgroundColor: "blue",
  },

});
