import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const InfoCard = ({ series, repeticoes }) => (

    <View style={styles.cards}>
        <View style={styles.card}>
            <Text style={styles.infoIcon}>🔁</Text>
            <Text style={styles.cardText}>{series} Séries</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.infoIcon}>⚡</Text>
            <Text style={styles.cardText}>{repeticoes} Repetições</Text>
        </View>

    </View>

);

const styles = StyleSheet.create({
    infoIcon: {
        fontSize: 22,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.primary,
    },
    infoSeparator: {
        width: 1,
        backgroundColor: colors.border,
        marginVertical: 16,
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },

    card: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },

    cardText: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
        color: colors.font,
    },
})