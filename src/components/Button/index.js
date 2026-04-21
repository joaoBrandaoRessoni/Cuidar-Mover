import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function Button({
    title,
    onPress,
    color = colors.greenPrimary,
    borderColor = colors.greenPrimary,
    borderWidth = 1,
    textColor = 'white'
}) {
    return (
        <View style={styles.viewBotao}>
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor: color,
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                    },
                ]}
                onPress={onPress} activeOpacity={0.8}
            >
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBotao: {
        paddingHorizontal: 35,
        justifyContent: 'center',
        alignContent: 'center'

    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});