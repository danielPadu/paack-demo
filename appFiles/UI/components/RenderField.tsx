import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';

export type RenderFieldTypes = {
  title: string;
  value?: string;
  valueExtraStyle?: StyleProp<TextStyle>;
};

export const RenderField = (props: RenderFieldTypes) => {
  const {title, value, valueExtraStyle} = props;
  const {fieldContainer, titleContainer, titleText, valueContainer, valueText} =
    styles;
  return (
    <View style={fieldContainer}>
      <View style={titleContainer}>
        <Text style={titleText}> {title}</Text>
      </View>
      <View style={valueContainer}>
        <Text style={[valueText, valueExtraStyle]}>{value}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    color: 'gray',
    fontWeight: '600',
  },
  valueContainer: {
    flex: 2,
  },

  valueText: {
    color: 'black',
    fontWeight: '600',
    textAlign:'center'
  },
});
