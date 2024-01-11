import React from 'react';
import { Text, View } from 'react-native';
import Theme from '../constants/theme';

module.exports.P = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'PoppinsRegular',
        color: Theme.textColor,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H1 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'Poppins',
        fontSize: 50,
        color: Theme.textColor,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};
module.exports.H2 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'PoppinsRegular',
        fontSize: 30,
        color: Theme.textColor,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H3 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'Poppins',
        color: Theme.textColor,
        fontSize: 25,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H4 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'Poppins',
        color: Theme.textColor,
        fontSize: 20,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H5 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'Poppins',
        color: Theme.textColor,
        fontSize: 18,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H6 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'Poppins',
        color: Theme.textColor,
        fontSize: 16,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H7 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'PoppinsRegular',
        color: Theme.textColor,
        fontSize: 12,
        paddingTop: 5,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H8 = function (props) {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
      style={{
        fontFamily: 'PoppinsRegular',
        color: Theme.textColor,
        fontSize: 10,
        paddingTop: 5,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.Pr = function (props) {
  return (
    <Text style={{ ...props.style }}>
      <Text
        style={{
          fontFamily: 'Poppins',
          color: Theme.textColor,
          fontSize: Math.floor((props.fontSize ? props.fontSize : 16) * 0.6),
          fontWeight: 'light',
        }}
      >
        LKR
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins',
          color: Theme.textColor,
          fontSize: props.fontSize ? props.fontSize : 16,
        }}
      >
        &nbsp;
        {isNaN(props.children)
          ? props.children
          : parseFloat(props.children)?.toFixed(2)}
      </Text>
    </Text>
  );
};
