import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function Input({
  placeholder,
  value,
  onChangeText,
  style,
  ...rest
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={colors.font}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 35
  },
  input: {
    backgroundColor: colors.fundo,
   // borderWidth: 0.2,
    //borderColor: colors.greenPrimary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
  },
});