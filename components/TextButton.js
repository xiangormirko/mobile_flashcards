import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple, white } from '../utils/colors';

export default function TextButton({
  children,
  onPress,
  style = {},
  textStyle = {},
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
      <Text style={[styles.reset, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: white,
    fontSize: 20,
  },
  buttonStyle: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: purple,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
