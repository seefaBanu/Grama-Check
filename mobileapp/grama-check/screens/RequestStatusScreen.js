import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Linking } from 'react-native';
import { H3, Pr, H7, H6, H4, P } from '../components/Texts';
import Header from '../components/Header';
import Theme from '../constants/theme';
import Status from '../components/Status';
import { Button } from '../components/Buttons';
import RefreshView from '../components/RefreshView';
import { useCallback } from 'react';
import env from '../constants/env';
import { AuthContext } from '../context/AuthContext';
export default function ({ navigation, route }) {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = React.useState({});
  const getData = useCallback(async () => {
    try {
      const response = await fetch(`${env.backend}/user/certificate`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (response.status == 401 || response.status == 403) {
        logout();
      }
      if (response.status == 404) {
        return navigation.navigate('ChooseOptionScreen');
      }

      if (!response.ok) {
        console.log(response);
      }
      const data = await response.json();
      setData(data);
      return;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H3>Certificate Request Status</H3>
        <RefreshView getData={getData} route={route}>
          <View style={styles.ordersContainer}>
            <H7 style={styles.orderInfo} selectable={true}>
              {data.id}
            </H7>
            <H6 style={styles.orderInfoFarmer}>
              Submitted on {data.status?.submitted.day}-
              {data.status?.submitted.month}-{data.status?.submitted.year}
            </H6>
            <Status
              status={{
                submitted: data.status?.submitted ? true : false,
                addressVerified: data.status?.addressVerified ? true : false,
                approved: data.status?.approved ? true : false,
                ready: data.status?.ready ? true : false,
              }}
            />
          </View>
          <View style={styles.buttonArea}>
            <Button
              title='Get Support'
              color='shadedWarning'
              size='big'
              onPress={() => {
                Linking.openURL('tel:1919');
              }}
            />
          </View>
          <P style={styles.infoText}>
            ⓘ Granting of the request is subject to police clearence.
          </P>
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

// const getData = React.useCallback(async () => {

//   return new Promise((resolve, reject) => {
//     resolve(true);
//   });
// }, []);
