import React from 'react';
import { Animated } from 'react-native';

export default function (props) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scrollAnim = React.useRef(new Animated.Value(100)).current;
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scrollAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: scrollAnim,
          },
        ],
        flex: 1,
      }}
    >
      {props.children}
    </Animated.View>
  );
}
