import React, { useCallback, useContext } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, SelectList } from '../components/Inputs';
import { H3, P } from '../components/Texts';
import Header from '../components/Header';
import LoadingModal from '../components/LoadingModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import env from '../constants/env';
import RefreshView from '../components/RefreshView';
import { AuthContext } from '../context/AuthContext';

export default function ({ navigation, route }) {
  const [saving, setSaving] = React.useState(false);
  const [division, setDivision] = React.useState('');
  const [gramaData, setGramaData] = React.useState([]);
  const { user, logout } = useContext(AuthContext);
  console.log(user.user);
  const getData = useCallback(async () => {
    try {
      const response = await fetch(`${env.backend}/gramadivisions`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (response.status == 401 || response.status == 403) {
        logout();
      }
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const res = await response.json();
      setGramaData(res);
      return;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
  const PersonSchema = Yup.object().shape({
    nic: Yup.string()
      .matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, 'Invalid NIC format')
      .required('NIC is required!'),
    address: Yup.string().required('Address is required!'),
  });
  const formik = useFormik({
    initialValues: {
      nic: user.user.nic,
      address: '',
    },
    validationSchema: PersonSchema,
  });

  async function submit() {
    formik.validateForm();
    Object.keys(formik.values).forEach((value) => {
      formik.setFieldTouched(value);
    });
    if (!Object.keys(formik.touched).length) return;
    for (let error in formik.errors) if (error) return;
    if (!division) return alert('Please select a Grama Niladari Division');
    const data = formik.values;
    setSaving(true);
    let response;
    try {
      const res = await fetch(env.backend + '/user/certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          nic: data.nic,
          address: data.address,
          gramaEmail: gramaData.find((item) => item.id == division).gramiEmail,
          // division: division,
        }),
      });
      console.log(res);
      console.log(res.text());
      // if (res.status == 401 || res.status == 403) {
      //   logout();
      //   return;
      // }
      response = await res.json();
      setSaving(false);

      formik.resetForm();
      if (res.status == 404) {
        if (response.message == 'Identity Check Failed.') {
          navigation.navigate('MessageScreen', {
            type: 'fail',
            messageTitle: 'NIC not found!',
            messageText:
              'The NIC you entered is not registered in our system. Please try again.',
            goto: 'NewRequestScreen',
            goButtonText: 'Try Again',
          });
          return;
        }
      }
      if (res.status == 201) {
        navigation.navigate('MessageScreen', {
          type: 'Success',
          messageTitle: 'Request Sent!',
          messageText:
            'We have received your request and your Grama Niladari will get back to you.',
          goto: 'RequestStatusScreen',
          goButtonText: 'Check Status',
        });
        return;
      }
      navigation.navigate('MessageScreen', {
        type: 'fail',
        messageTitle: 'Something went wrong :(',
        messageText:
          "Not everything goes the way we like. Let's try again later :)",
        goto: 'NewRequestScreen',
        goButtonText: 'Try Again',
      });
    } catch (e) {
      setSaving(false);
      console.log(e);
      navigation.navigate('MessageScreen', {
        type: 'fail',
        messageTitle: 'Something went wrong :(',
        messageText:
          "Not everything goes the way we like. Let's try again later :)",
        goto: 'NewRequestScreen',
        goButtonText: 'Try Again',
      });
    }
  }
  console.log(division);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Sending Request' visible={saving} />
        <Header back={true} home={true} />
        <H3 style={{ textAlign: 'center' }}>Submit Certificate Request</H3>
        <RefreshView getData={getData} route={route}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pageContent}>
              <Image
                source={require('../assets/newrequest.png')}
                style={styles.vectorimage}
              />
              <View style={styles.inputcont}>
                <TextInputBox
                  inputlabel='National Identity Card Number'
                  placeholder='Enter NIC'
                  onChangeText={formik.handleChange('nic')}
                  name='nic'
                  onBlur={() => formik.setFieldTouched('nic', true, true)}
                  value={formik.values.nic}
                  error={formik.errors.nic}
                  touched={formik.touched.nic}
                  disabled={true}
                />
                <TextInputBox
                  inputlabel='Address'
                  placeholder='Enter address'
                  onChangeText={formik.handleChange('address')}
                  name='address'
                  onBlur={() => formik.setFieldTouched('address', true, true)}
                  value={formik.values.address}
                  error={formik.errors.address}
                  touched={formik.touched.address}
                />
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      color: Theme.textColor,
                      fontFamily: 'Poppins',
                      fontSize: 16,
                    }}
                  >
                    Grama Niladari Division
                  </Text>
                  <SelectList
                    placeholder='-- Select division'
                    notFoundText='No division found'
                    searchPlaceholder='Search division...'
                    data={gramaData?.map((item) => {
                      return {
                        key: item.id,
                        value: item.gnDivision,
                      };
                    })}
                    value={division}
                    save='key'
                    setSelected={(item) => setDivision(item)}
                  />
                </View>
                <View style={{ height: 20 }} />
                <Button
                  title='Submit Request'
                  color='filledPrimary'
                  size='big'
                  onPress={submit}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <P style={styles.infoText}>
                ⓘ Granting of the request is subject to police clearence.
              </P>
            </View>
          </ScrollView>
        </RefreshView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  pageContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  vectorimage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  inputcont: {
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
