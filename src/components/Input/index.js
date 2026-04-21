import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Input({
    placeholder,
    value,
    onChangeText,
    style,
    keyboardType,
    secureTextEntry,
    iconName,
    iconColor = '#999',
    ...rest
}) {
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                {iconName && (
                    <Ionicons
                        name={iconName}
                        size={20}
                        color={iconColor}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, style, { borderWidth: 0 }]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.font}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType ?? "default"}
                    secureTextEntry={secureTextEntry}
                    underlineColorAndroid="transparent"
                    {...rest}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 35
    },
    input: {
       // backgroundColor: colors.fundo,
        borderWidth: 0, 
        borderColor: 'transparent',
        borderRadius: 8,
        paddingVertical: 14,
        color: 'white',
        fontSize: 16,
        outlineWidth: 0,
        outlineStyle: 'none',

      },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.fundo,
        borderRadius: 8,
        paddingHorizontal: 12,
        width: '100%',
      },
      icon: {
        marginRight: 8,
      },
});