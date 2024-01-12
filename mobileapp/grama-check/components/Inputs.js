import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { SelectList } from 'react-native-dropdown-select-list';
import { Entypo } from '@expo/vector-icons';
import Theme from '../constants/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from 'expo-checkbox';
import { H6 } from './Texts';

module.exports.TextInputBox = function (props) {
  const [state, setState] = useState(0);

  return (
    <View style={styles.inputcont}>
      <Text style={styles.inputlabel}>{props.inputlabel}</Text>

      <TextInput
        onFocus={() => {
          setState(1);
        }}
        onBlur={() => {
          props.onBlur();
          setState(0);
        }}
        name={props.name}
        style={[styles.input, state ? styles.inputFocused : null]}
        placeholder={props.placeholder}
        textContentType={props.type}
        secureTextEntry={props.secure ? true : false}
        keyboardType={props.keyboardType}
        inputMode={props.inputMode}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Theme.placeholderText}
      />
      {props.error && props.touched && (
        <Text style={styles.errormsg}>{props.error}</Text>
      )}
    </View>
  );
};

module.exports.MaskedTextInputBox = function (props) {
  const [state, setState] = useState(0);
  return (
    <View style={styles.inputcont}>
      <Text style={styles.inputlabel}>{props.inputlabel}</Text>
      <MaskedTextInput
        onFocus={() => {
          setState(1);
        }}
        onBlur={() => {
          props.onBlur();
          setState(0);
        }}
        name={props.name}
        mask={props.mask}
        style={{ ...styles.input, ...(state ? styles.inputFocused : null) }}
        placeholder={props.placeholder}
        textContentType={props.type}
        keyboardType={props.keyboardType}
        inputMode={props.inputMode}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Theme.placeholderText}
      />
      {props.error && props.touched && (
        <Text style={styles.errormsg}>{props.error}</Text>
      )}
    </View>
  );
};

module.exports.DropDownPicker = function (props) {
  const [open, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.value || null);
  const [items, setItems] = useState(props.items || []);
  React.useEffect(() => {
    props.onChange(value);
  }, [value]);
  return (
    <>
      <View style={[styles.inputcont, styles.pickerCont]}>
        <Text style={styles.inputlabel}>{props.inputlabel}</Text>
        <DropDownPicker
          listMode='SCROLLVIEW'
          {...props}
          items={items}
          value={value}
          open={open}
          setOpen={setIsOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.picker}
          containerStyle={styles.pickerContainer}
          dropDownContainerStyle={styles.dropDownContainer}
          textStyle={styles.pickerText}
          ArrowDownIconComponent={({ style }) => (
            <Entypo
              style={style}
              name='chevron-down'
              size={24}
              color={Theme.textColor}
            />
          )}
          arrowIconContainerStyle={styles.pickerArrowContainer}
          ArrowUpIconComponent={({ style }) => (
            <Entypo
              style={style}
              name='chevron-up'
              size={24}
              color={Theme.textColor}
            />
          )}
          TickIconComponent={({ style }) => (
            <Entypo
              style={style}
              name='check'
              size={22}
              color={Theme.textColor}
            />
          )}
        />
      </View>
      {props.error && props.touched && (
        <Text style={[styles.errormsg, styles.pickerError]}>{props.error}</Text>
      )}
    </>
  );
};

module.exports.SelectList = function (props) {
  return (
    <SelectList
      placeholder='--Select'
      searchPlaceholder='Search...'
      save='value'
      {...props}
      fontFamily='Poppins'
      inputStyles={{
        color: Theme.textColor,
        fontSize: 18,
        minHeight: 30,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}
      boxStyles={{
        borderColor: Theme.contrastTextColor,
        backgroundColor: Theme.contrastTextColor,
        alignItems: 'center',
        alignContent: 'center',
      }}
      dropdownTextStyles={{ color: Theme.textColor, fontSize: 16 }}
      dropdownStyles={{
        borderColor: 'white',
        backgroundColor: 'white',
      }}
      arrowicon={
        <Entypo name='chevron-down' size={24} color={Theme.textColor} />
      }
    />
  );
};

module.exports.CheckBox = function (props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <CheckBox
        disabled={false}
        value={props.value}
        onValueChange={(newValue) => props.setCheckBox(newValue)}
        style={{ margin: 10 }}
        color={Theme.textColor}
      />
      <H6 style={{ fontFamily: 'Poppins' }}>{props.label}</H6>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  errormsg: {
    color: Theme.danger,
    fontFamily: 'Poppins',
    marginVertical: 5,
    marginHorizontal: 4,
    fontSize: 14,
  },
  inputcont: {
    width: '100%',
    marginVertical: 10,
  },
  pickerCont: {
    zIndex: 999,
    marginBottom: 0,
  },
  pickerError: {
    zIndex: 900,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  inputlabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  input: {
    fontFamily: 'Poppins',
    color: Theme.textColor,
    padding: 9,
    paddingHorizontal: 10,
    backgroundColor: Theme.contrastTextColor,
    borderRadius: 10,
    fontSize: 18,
    minHeight: 50,
  },
  inputFocused: {
    backgroundColor: Theme.primaryShade,
  },
  dateCont: {
    padding: 10,
    paddingHorizontal: 10,
    marginVertical: 0,
    borderRadius: 10,
    backgroundColor: Theme.contrastTextColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    backgroundColor: Theme.contrastTextColor,
    borderColor: Theme.contrastTextColor,
    borderRadius: 10,
  },
  pickerText: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: Theme.textColor,
  },
  pickerContainer: {
    borderColor: Theme.contrastTextColor,
    borderRadius: 10,
  },
  dropDownContainer: {
    backgroundColor: Theme.overlay,
    borderRadius: 10,
    borderColor: Theme.overlay,
    zIndex: 10000,
  },
  pickerArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
});
