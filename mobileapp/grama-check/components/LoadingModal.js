import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ModalComponent from './ModalComponent';
import { H5 } from './Texts';
import Theme from '../constants/theme';
export default function (props) {
  return (
    <ModalComponent visible={props.visible}>
      <View style={styles.modalContent}>
        <View style={{ height: 50, width: 50 }}>
          <ActivityIndicator size='large' color={Theme.textColor} />
        </View>
        <H5>{props.message}</H5>
      </View>
    </ModalComponent>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
