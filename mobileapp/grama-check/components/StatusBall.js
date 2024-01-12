import React from 'react';
import { View } from 'react-native';
import { H5 } from '../components/Texts';
import { Entypo } from '@expo/vector-icons';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <View style={styles.statusBall}>
      <View style={styles.ballContainer}>
        <View style={[styles.ball, props.done ? styles.filledBall : null]}>
          {props.done && (
            <Entypo name='check' size={28} color={Theme.contrastTextColor} />
          )}
        </View>
      </View>
      <View style={styles.statusText}>
        <H5>{props.status}</H5>
      </View>
    </View>
  );
}
const styles = {
  statusBall: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  ballContainer: {
    zIndex: 100,
    width: 100,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    height: 50,
    width: 50,
    backgroundColor: Theme.tertiary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledBall: {
    height: 50,
    width: 50,
    borderRadius: 20,
    backgroundColor: Theme.primary,
  },
};
