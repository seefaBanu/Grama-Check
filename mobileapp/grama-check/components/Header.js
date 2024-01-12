import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { H3 } from './Texts';
import Theme from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function (props) {
  function goHome() {
    nav.navigate('ChooseOptionScreen');
  }
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      {props.back ? (
        <TouchableOpacity onPress={nav.goBack}>
          <Ionicons name='ios-chevron-back' size={28} color={Theme.textColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }}></View>
      )}
      <H3>GramaCheck</H3>
      {props.home ? (
        <TouchableOpacity onPress={goHome}>
          <Octicons name='home' size={28} color={Theme.textColor} />
        </TouchableOpacity>
      ) : null}
      {!props.home && <View style={{ width: 28 }}></View>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    margin: 0,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    width: 100,
    resizeMode: 'contain',
  },
  icon: {
    height: 28,
    width: 28,
  },
});
