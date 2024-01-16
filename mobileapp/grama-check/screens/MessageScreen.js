import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { H3, H5 } from '../components/Texts';
import { Button } from '../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

export default function ({ navigation, route }) {
  function buttonPress() {
    if (route.params.goto && !route.params.screenParams) {
      navigation.navigate(route.params.goto);
      return;
    }
    if (route.params.goto && route.params.screenParams) {
      navigation.navigate(route.params.goto, route.params.screenParams);
      return;
    }
    navigation.goBack();
    return;
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header />
        <View style={styles.pageContent}>
          <Image
            source={
              route.params.type == 'Success'
                ? require('../assets/success.png')
                : require('../assets/fail.png')
            }
            style={styles.messageImage}
          />
          <H3 style={styles.messageTitle}>{route.params.messageTitle}</H3>
          <H5 style={styles.messageText}>
            {route.params.subjectId}
            {route.params.messageText}
          </H5>
          <Button
            title={
              route.params.goButtonText ? route.params.goButtonText : 'Go Back'
            }
            color='filledSecondary'
            size='big'
            onPress={buttonPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    fontFamily: 'Poppins',
    height: '100%',
  },
  pageContent: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  messageImage: {
    height: 150,
    resizeMode: 'contain',
  },
  messageTitle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    paddingVertical: 50,
  },
  messageText: {
    paddingBottom: 30,
    textAlign: 'center',
  },
});
