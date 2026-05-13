import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { colors } from '../theme/colors';

const PAIN_LEVELS = [
    {
        id: 0,
        label: 'Sem Dor / Esforço',
        description: 'Absolutamente confortável',
        emoji: '😊',
        value: 0,
        color: '#4CAF50',
        bgColor: '#E8F5E9',
    },
    {
        id: 1,
        label: 'Leve',
        description: 'Atividade tranquila e agradável',
        emoji: '🙂',
        value: 2,
        color: '#8BC34A',
        bgColor: '#F1F8E9',
    },
    {
        id: 2,
        label: 'Moderado',
        description: 'Senti o esforço, mas sem dor',
        emoji: '😐',
        value: 5,
        color: '#FFC107',
        bgColor: '#FFF8E1',
    },
    {
        id: 3,
        label: 'Intenso',
        description: 'Exigiu bastante concentração',
        emoji: '😣',
        value: 8,
        color: '#FF9800',
        bgColor: '#FFF3E0',
    },
    {
        id: 4,
        label: 'Exaustão',
        description: 'Limite físico atingido',
        emoji: '😫',
        value: 10,
        color: '#F44336',
        bgColor: '#FFEBEE',
    },
];

export default function Feedback({ navigation }) {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [observations, setObservations] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (selectedLevel === null) {
            Alert.alert(
                'Atenção',
                'Por favor, selecione como você se sente antes de salvar.',
                [{ text: 'OK' }]
            );
            return;
        }

        setIsSubmitting(true);

        const feedbackData = {
            painLevel: PAIN_LEVELS[selectedLevel].value,
            painLabel: PAIN_LEVELS[selectedLevel].label,
            observations: observations.trim(),
            timestamp: new Date().toISOString(),
        };

        try {
            console.log('Feedback enviado:', feedbackData);

            Alert.alert(
                'Feedback Salvo! ✅',
                'Obrigado por avaliar sua sessão. Seu progresso é nossa prioridade.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            if (navigation) navigation.goBack();
                        },
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar o feedback. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const PainLevelCard = ({ item, index }) => {
        const isSelected = selectedLevel === index;

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedLevel(index)}
                style={[
                    styles.painCard,
                    isSelected && {
                        borderColor: item.color,
                        backgroundColor: item.bgColor,
                        shadowColor: item.color,
                        shadowOpacity: 0.25,
                        shadowRadius: 12,
                        elevation: 6,
                    },
                ]}
            >
                <View style={styles.painCardLeft}>
                    <View
                        style={[
                            styles.emojiContainer,
                            {
                                backgroundColor: isSelected ? item.color + '20' : colors.surfaceAlt,
                            },
                        ]}
                    >
                        <Text style={styles.emoji}>{item.emoji}</Text>
                    </View>
                    <View style={styles.painTextContainer}>
                        <Text
                            style={[
                                styles.painLabel,
                                isSelected && { color: item.color, fontWeight: '700' },
                            ]}
                        >
                            {item.label}
                        </Text>
                        <Text style={styles.painDescription}>{item.description}</Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.valueChip,
                        {
                            backgroundColor: isSelected ? item.color : colors.surfaceAlt,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.valueText,
                            { color: isSelected ? '#FFF' : colors.textSecondary },
                        ]}
                    >
                        {item.value}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const ProgressBar = () => {
        const progress = selectedLevel !== null ? (PAIN_LEVELS[selectedLevel].value / 10) : 0;
        const barColor = selectedLevel !== null ? PAIN_LEVELS[selectedLevel].color : colors.border;

        return (
            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${progress * 100}%`,
                                backgroundColor: barColor,
                            },
                        ]}
                    />
                </View>
                <View style={styles.progressLabels}>
                    <Text style={styles.progressLabelText}>0</Text>
                    <Text style={styles.progressLabelText}>5</Text>
                    <Text style={styles.progressLabelText}>10</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>SESSÃO FINALIZADA</Text>
                        </View>
                        <Text style={styles.title}>Como você{'\n'}se sente?</Text>
                        <Text style={styles.subtitle}>
                            Avalie seu nível de dor e esforço após o exercício para que
                            possamos ajustar seu plano.
                        </Text>
                    </View>

                    <ProgressBar />

                    <View style={styles.optionsContainer}>
                        {PAIN_LEVELS.map((item, index) => (
                            <PainLevelCard key={item.id} item={item} index={index} />
                        ))}
                    </View>

                    <View style={styles.observationsSection}>
                        <Text style={styles.sectionTitle}>Observações Adicionais</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Descreva qualquer desconforto específico ou comentário sobre os exercícios de hoje..."
                                placeholderTextColor={colors.textMuted}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                value={observations}
                                onChangeText={setObservations}
                                maxLength={500}
                            />
                            <Text style={styles.charCount}>
                                {observations.length}/500
                            </Text>
                        </View>
                    </View>


                    <View style={styles.brandingContainer}>
                        <Text style={styles.brandingName}>
                            UNIFAE CARE
                        </Text>
                        <Text style={styles.brandingSlogan}>
                            Seu progresso é nossa prioridade.
                        </Text>
                    </View>
                </ScrollView>

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        style={[
                            styles.submitButton,
                            selectedLevel === null && styles.submitButtonDisabled,
                            isSubmitting && styles.submitButtonDisabled,
                        ]}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? 'Salvando...' : 'Salvar Feedback'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
    },


    header: {
        marginBottom: 24,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.greenPrimary + '18',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 16,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.greenPrimary,
        letterSpacing: 1.5,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.text,
        lineHeight: 38,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: colors.textSecondary,
        lineHeight: 22,
    },


    progressContainer: {
        marginBottom: 24,
    },
    progressTrack: {
        height: 6,
        backgroundColor: colors.borderLight,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    progressLabelText: {
        fontSize: 11,
        color: colors.textMuted,
        fontWeight: '600',
    },

    optionsContainer: {
        gap: 10,
        marginBottom: 28,
    },
    painCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderColor: colors.borderLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    painCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    emojiContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    emoji: {
        fontSize: 22,
    },
    painTextContainer: {
        flex: 1,
    },
    painLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 2,
    },
    painDescription: {
        fontSize: 12,
        color: colors.textMuted,
        lineHeight: 16,
    },
    valueChip: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    valueText: {
        fontSize: 15,
        fontWeight: '700',
    },

    observationsSection: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 10,
    },
    textInputContainer: {
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: colors.borderLight,
        overflow: 'hidden',
    },
    textInput: {
        fontSize: 14,
        color: colors.text,
        lineHeight: 20,
        padding: 16,
        minHeight: 110,
    },
    charCount: {
        fontSize: 11,
        color: colors.textMuted,
        textAlign: 'right',
        paddingRight: 16,
        paddingBottom: 10,
    },

    brandingContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 8,
    },
    brandingIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    brandingName: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.greenPrimary,
        marginBottom: 4,
    },
    brandingAccent: {
        color: colors.primaryGreenLight,
    },
    brandingSlogan: {
        fontSize: 13,
        color: colors.textMuted,
    },

    footerContainer: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 8 : 20,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
    },
    submitButton: {
        backgroundColor: colors.greenPrimary,
        borderRadius: 16,
        paddingVertical: 17,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.greenPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonDisabled: {
        backgroundColor: colors.border,
        shadowOpacity: 0,
        elevation: 0,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
});