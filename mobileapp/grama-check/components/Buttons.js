import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

import Theme from '../constants/theme';

module.exports.Button = function (props) {
  let buttonBackground = [];
  let buttonText = [];
  let indicatorColor = Theme.textColor;
  switch (props.color) {
    case 'shadedPrimary':
      buttonBackground.push(styles.shadedPrimaryBackground);
      buttonText.push(styles.shadedPrimaryText);
      indicatorColor = Theme.primary;
      break;
    case 'filledPrimary':
      buttonBackground.push(styles.filledPrimaryBackground);
      buttonText.push(styles.filledPrimaryText);
      indicatorColor = Theme.contrastTextColor;
      break;
    case 'shadedSecondary':
      buttonBackground.push(styles.shadedSecondaryBackground);
      buttonText.push(styles.shadedSecondaryText);
      indicatorColor = Theme.secondary;
      break;
    case 'filledSecondary':
      buttonBackground.push(styles.filledSecondaryBackground);
      buttonText.push(styles.filledSecondaryText);
      indicatorColor = Theme.contrastTextColor;
      break;
    case 'shadedTertiary':
      buttonBackground.push(styles.shadedTertiaryBackground);
      buttonText.push(styles.shadedTertiaryText);
      indicatorColor = Theme.textColor;
      break;
    case 'filledTertiary':
      buttonBackground.push(styles.filledTertiaryBackground);
      buttonText.push(styles.filledTertiaryText);
      indicatorColor = Theme.contrastTextColor;
      break;
    case 'shadedWarning':
      buttonBackground.push(styles.shadedWarningBackground);
      buttonText.push(styles.shadedWarningText);
      indicatorColor = Theme.textColor;
      break;
    case 'filledWarning':
      buttonBackground.push(styles.filledWarningBackground);
      buttonText.push(styles.filledWarningText);
      indicatorColor = Theme.textColor;
      break;
    case 'shadedDanger':
      buttonBackground.push(styles.shadedDangerBackground);
      buttonText.push(styles.shadedDangerText);
      indicatorColor = Theme.danger;
      break;
    case 'filledDanger':
      buttonBackground.push(styles.filledDangerBackground);
      buttonText.push(styles.filledBigButtonText);
      indicatorColor = Theme.contrastTextColor;
      break;
  }
  switch (props.size) {
    case 'small':
      buttonBackground.push(styles.smallButtonBackground);
      buttonText.push(styles.smallButtonText);
      break;
    case 'normal':
      buttonBackground.push(styles.normalButtonBackground);
      buttonText.push(styles.normalButtonText);
      break;
    case 'big':
      buttonBackground.push(styles.bigButtonBackground);
      buttonText.push(styles.bigButtonText);
  }
  buttonBackground.push(props.backgroundStyle);
  buttonText.push(props.textStyle);
  let button = (
    <TouchableOpacity
      style={buttonBackground}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.loading && (
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size='small' color={indicatorColor} />
        </View>
      )}
      <Text style={buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
  if (props.type == 'icon') {
    button = (
      <TouchableOpacity
        style={[buttonBackground, styles.buttonIconBackground]}
        onPress={props.onPress}
      >
        {props.loading && (
          <View style={styles.activityContainer}>
            <ActivityIndicator size='small' color={indicatorColor} />
          </View>
        )}
        {!props.loading && props.icon}
        <Text
          style={[
            buttonText,
            styles.buttonIconText,
            props.size == 'normal' ? styles.normalButtonIconText : null,
          ]}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  }
  buttonBackground.push(props.backgroundStyle);
  buttonText.push(props.textStyle);
  return button;
};

const styles = StyleSheet.create({
  bigButtonText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    textAlign: 'center',
  },
  bigButtonBackground: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    borderRadius: 18,
    justifyContent: 'center',
  },
  normalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  normalButtonBackground: {
    flexDirection: 'row',
    padding: 6,
    paddingHorizontal: 8,
    margin: 5,
    borderRadius: 12,
    justifyContent: 'center',
  },
  smallButtonText: {
    fontSize: 12,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },
  smallButtonBackground: {
    flexDirection: 'row',
    padding: 5,
    margin: 6,
    borderRadius: 10,
    justifyContent: 'center',
  },
  shadedBigButtonBackground: {
    backgroundColor: Theme.primaryShade,
  },
  shadedBigButtonText: {
    color: Theme.primary,
  },
  filledBigButtonBackground: {
    backgroundColor: Theme.primary,
  },
  filledBigButtonText: {
    color: Theme.contrastTextColor,
  },
  filledNormalButtonBackground: {
    padding: 2,
    width: '25%',
    borderRadius: 10,
    backgroundColor: Theme.primary,
    color: Theme.contrastTextColor,
  },
  filledNormalButtonText: {
    color: Theme.contrastTextColor,
  },
  greyButtonBackground: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Theme.overlay,
    padding: 5,
    marginHorizontal: 5,
  },
  shadedPrimaryBackground: {
    backgroundColor: Theme.primaryShade,
  },
  shadedPrimaryText: {
    color: Theme.primary,
  },
  filledPrimaryBackground: {
    backgroundColor: Theme.primary,
  },
  filledPrimaryText: {
    color: Theme.contrastTextColor,
  },
  shadedSecondaryBackground: {
    backgroundColor: Theme.secondaryShade,
  },
  shadedSecondaryText: {
    color: Theme.secondary,
  },
  filledSecondaryBackground: {
    backgroundColor: Theme.secondary,
  },
  filledSecondaryText: {
    color: Theme.contrastTextColor,
  },
  shadedTertiaryBackground: {
    backgroundColor: Theme.tertiaryShade,
  },
  shadedTertiaryText: {
    color: Theme.textColor,
  },
  filledTertiaryBackground: {
    backgroundColor: Theme.tertiary,
  },
  filledTertiaryText: {
    color: Theme.contrastTextColor,
  },
  shadedWarningBackground: {
    backgroundColor: Theme.warningShade,
  },
  shadedWarningText: {
    color: Theme.textColor,
  },
  filledWarningBackground: {
    backgroundColor: Theme.warning,
  },
  filledWarningText: {
    color: Theme.textColor,
  },
  shadedDangerBackground: {
    backgroundColor: Theme.dangerShade,
  },
  shadedDangerText: {
    color: Theme.danger,
  },
  filledDangerBackground: {
    backgroundColor: Theme.danger,
  },
  filledDangerText: {
    color: Theme.contrastTextColor,
  },
  buttonIconBackground: {
    flexDirection: 'column',
    borderRadius: 16,
    minHeight: 48,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconText: {
    fontSize: 8,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  normalButtonIconText: {
    fontSize: 10,
  },
  activityContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
});

module.exports.BigButton = function (props) {
  return (
    <TouchableOpacity
      style={styles.bigButtonBackground}
      onPress={props.onPress}
    >
      <Text style={styles.bigButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};
module.exports.SmallSecondaryButton = function (props) {
  return (
    <TouchableOpacity
      style={[styles.greyButtonBackground]}
      onPress={props.onPress}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

module.exports.FilledBigButton = function (props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.bigButtonBackground, styles.filledBigButtonBackground]}
    >
      <Text style={[styles.bigButtonText, styles.filledBigButtonText]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

module.exports.FilledNormalButton = function (props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.filledNormalButtonBackground}
    >
      <Text style={styles.filledNormalButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

module.exports.ShadedBigButton = function (props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.bigButtonBackground, styles.shadedBigButtonBackground]}
    >
      <Text style={[styles.bigButtonText, styles.shadedBigButtonText]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
