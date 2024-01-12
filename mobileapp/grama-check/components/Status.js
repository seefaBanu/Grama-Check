import React from 'react';
import { View } from 'react-native';
import { H3 } from './Texts';
import StatusBall from './StatusBall';
export default function (props) {
  const status = props.status;
  return (
    <View style={styles.container}>
      <View style={styles.statusArea}>
        <StatusBall status='Submitted' first={true} done={status?.submitted} />
        <StatusBall status='Address Verified' done={status?.addressVerified} />
        <StatusBall status='Approved' done={status?.approved} />
        <StatusBall status='Ready' last={true} done={props.ready} />
      </View>
    </View>
  );
}
const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  statusArea: {
    // alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
};
