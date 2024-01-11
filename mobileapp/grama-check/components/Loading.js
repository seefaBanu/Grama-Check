import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import theme from '../constants/theme';

export default function () {
  const jumpAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -15,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [jumpAnim]);
  return (
    <View style={styles.screen}>
      <Animated.View
        style={[
          styles.loadingBox,
          {
            transform: [
              {
                translateY: jumpAnim,
              },
            ],
          },
        ]}
      >
        {/* <Image source={require('../assets/loading.png')} style={styles.icon} /> */}
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  loadingBox: {
    height: 120,
    width: 120,
    backgroundColor: theme.overlay,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
});
