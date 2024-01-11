import React from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, SelectList } from '../components/Inputs';
import { H3, P } from '../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import LoadingModal from '../components/LoadingModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ({ navigation, route }) {
  const [saving, setSaving] = React.useState(false);
  const [divisions, setDivisions] = React.useState([
    { value: 'Colombo', key: 'colombo' },
    { value: 'Siddamulla', key: 'siddamulla' },
    { value: 'Piliyandala', key: 'piliyandala' },
    { value: 'Katubedda', key: 'katubedda' },
  ]);
  const [userData, setUserData] = React.useState({});
  const [division, setDivision] = React.useState('');

  const PersonSchema = Yup.object().shape({
    nic: Yup.string()
      .matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, 'Invalid NIC format')
      .required('NIC is required!'),
    address: Yup.string().required('Address is required!'),
  });
  const formik = useFormik({
    initialValues: {
      nic: '',
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
    const data = formik.values;
    setUserData(data);
    setSaving(true);
    setSaving(false);
    if (error) {
      navigation.navigate('Message', {
        type: 'fail',
        messageTitle: 'Something went wrong :(',
        messageText:
          "Not everything goes the way we like. Let's try again later :)",
        goto: 'Card Management',
        goButtonText: 'Try Again',
      });
      return;
    } else if (setupIntent) {
      navigation.navigate('Message', {
        type: 'Success',
        messageTitle: 'Request Submitted!',
        messageText:
          'We have received your request and your Grama Niladari will get back to you.',
        goto: 'Card Management',
        goButtonText: 'Track Request',
      });
      return;
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Sending Request' visible={saving} />
        <Header back={true} home={true} />
        <H3 style={{ textAlign: 'center' }}>Submit Certificate Request</H3>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Image
              source={require('../assets/newrequest.png')}
              style={styles.vectorimage}
            />
            <View style={styles.inputcont}>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    color: Theme.textColor,
                    fontFamily: 'Poppins',
                    fontSize: 16,
                  }}
                >
                  Select Grama Niladari Division
                </Text>
                <SelectList
                  placeholder='-- Select division'
                  notFoundText='No division found'
                  searchPlaceholder='Search division...'
                  data={divisions}
                  save='key'
                  value={division}
                  setSelected={(item) => setDivision(item)}
                  // setSelected={(item)=>}
                />
              </View>
              <TextInputBox
                inputlabel='National Identity Card Number'
                placeholder='Enter NIC'
                onChangeText={formik.handleChange('nic')}
                name='nic'
                onBlur={() => formik.setFieldTouched('nic', true, true)}
                value={formik.values.nic}
                error={formik.errors.nic}
                touched={formik.touched.nic}
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
