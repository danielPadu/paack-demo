import React from 'react';
import {ActivityIndicator, ColorValue, StyleSheet} from 'react-native';

type aiType = (
  visible: boolean,
  size?: number | 'small' | 'large',
  color?: ColorValue,
) => JSX.Element | null;

export const activityIndicator: aiType = (
  visible,
  size = 'small',
  color = '#0000ff',
) => {
  const {activityIndicatorgStyle} = styles;
  return visible ? (
    <ActivityIndicator
      style={activityIndicatorgStyle}
      size={size}
      color={color}
    />
  ) : null;
};
const styles = StyleSheet.create({
  activityIndicatorgStyle: {marginLeft: 10},
});
