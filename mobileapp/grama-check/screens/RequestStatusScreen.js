import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { H3, Pr, H7, H6, H4, P } from '../components/Texts';
import Header from '../components/Header';
import Theme from '../constants/theme';
import Status from '../components/Status';
import { Button } from '../components/Buttons';
import RefreshView from '../components/RefreshView';

export default function ({ navigation, route }) {
  const [order, setOrder] = React.useState({});
  const getData = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H3>Certificate Request Status</H3>
        <RefreshView getData={getData} route={route}>
          <View style={styles.ordersContainer}>
            <H7 style={styles.orderInfo} selectable={true}>
              sldfja-sdlkfjsd-slkdjfs-sdfsdf
            </H7>
            <H6 style={styles.orderInfoFarmer}>Submitted on 1 Jan 2024</H6>
            <Status
              status={{
                submitted: true,
                addressVerified: false,
                approved: true,
                ready: false,
              }}
              isDelivery={order?.isDelivery}
              reviewed={order?.farmerRating != -1}
            />
          </View>
          <View style={styles.buttonArea}>
            <Button title='Get Support' color='shadedWarning' size='big' />
          </View>
          {!order?.orderUpdate?.cancelled && (
            <P style={styles.infoText}>
              ⓘ Granting of the request is subject to police clearence.
            </P>
          )}
        </RefreshView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  pageArea: {
    marginBottom: 30,
  },
  container: {
    width: '100%',

    paddingHorizontal: 10,
  },
  ordersContainer: {
    marginVertical: 10,
  },
  orderInfo: {
    textAlign: 'center',
  },
  orderInfoFarmer: {
    textAlign: 'center',
    color: Theme.secondary,
  },
  title: {
    textAlign: 'center',
  },
  buttonArea: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 50,
  },
});
