import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import Theme from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function (props) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.visible}
      onRequestClose={props.closeModal}
    >
      <View style={styles.container} onPress={props.closeModal}>
        {/* <TouchableWithoutFeedback> */}
        <View style={styles.closeContent}>
          {props.closeModal ? (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={props.closeModal}
            >
              <Ionicons
                name='ios-close-circle'
                size={40}
                color={Theme.tertiary}
              />
            </TouchableOpacity>
          ) : null}
          <View style={styles.content}>{props.children}</View>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: Theme.overlayShade,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeContent: {
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.defaultBackground,
  },
  content: {
    padding: 20,
  },
});
