import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import CardConsulta from '../components/CardConsulta';
import { useNavigation } from '@react-navigation/native';

const CONSULTAS = {
    '2026-05-07': [
        {
            id: 1,
            title: 'Dr. João Silva',
            text: '09:00 · Cardiologia',
            local: 'Clínica CardioVida',
        },
    ],
    '2026-05-14': [
        {
            id: 2,
            title: 'Dra. Ana Souza',
            text: '14:30 · Dermatologia',
            local: 'Hospital Central',
        },
        {
            id: 3,
            title: 'Dr. Carlos Lima',
            text: '16:00 · Clínico Geral',
            local: 'UBS Jardim das Flores',
        },
    ],
    '2026-05-21': [
        {
            id: 4,
            title: 'Dra. Mariana Costa',
            text: '10:00 · Oftalmologia',
            local: 'Clínica VisionCare',
        },
    ],
    '2026-05-28': [
        {
            id: 5,
            title: 'Dr. Pedro Nunes',
            text: '08:00 · Ortopedia',
            local: 'Hospital Ortopédico',
        },
    ],
    '2026-06-03': [
        {
            id: 6,
            title: 'Dr. Pedro Nunes',
            text: '08:00 · Ortopedia',
            local: 'Hospital Ortopédico',
        },
    ],
    '2026-06-10': [
        {
            id: 7,
            title: 'Dr. Pedro Nunes',
            text: '08:00 · Ortopedia',
            local: 'Hospital Ortopédico',
        },
    ],
    '2026-06-17': [
        {
            id: 8,
            title: 'Dr. Pedro Nunes',
            text: '08:00 · Ortopedia',
            local: 'Hospital Ortopédico',
        },
    ],
    '2026-06-24': [
        {
            id: 9,
            title: 'Dr. Pedro Nunes',
            text: '08:00 · Ortopedia',
            local: 'Hospital Ortopédico',
        },
    ],
};

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function toKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildGrid(year, month) {
    const firstWeekday = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells = Array(firstWeekday).fill(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

export default function AgendaScreen() {
    const today = new Date();
    const [modalVisible, setModalVisible] = useState(false);
    const [viewDate, setViewDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1),
    );
    const [selectedKey, setSelectedKey] = useState(null);
    const navigation = useNavigation()

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const grid = buildGrid(year, month);

    const goBack = () => {
        setViewDate(new Date(year, month - 1, 1));
        setSelectedKey(null);
    };
    const goNext = () => {
        setViewDate(new Date(year, month + 1, 1));
        setSelectedKey(null);
    };

    const handleDayPress = (day) => {
        if (!day) return;
        const key = toKey(year, month, day);
        setSelectedKey((prev) => (prev === key ? null : key));
    };

    const handleDesmarcar = () => {
        setModalVisible(true);
    };

    const isToday = (day) =>
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

    const isSelected = (day) => selectedKey === toKey(year, month, day);
    const hasConsulta = (day) => !!CONSULTAS[toKey(year, month, day)];

    const selectedConsultas = selectedKey ? CONSULTAS[selectedKey] : null;

    const [selMonth, selDay] = selectedKey
        ? selectedKey.split('-').slice(1)
        : [];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.calendarCard}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={goBack} style={styles.navBtn} activeOpacity={0.7}>
                        <Ionicons name="chevron-back" size={20} color={colors.greenPrimary} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        {MONTHS[month]} {year}
                    </Text>

                    <TouchableOpacity onPress={goNext} style={styles.navBtn} activeOpacity={0.7}>
                        <Ionicons name="chevron-forward" size={20} color={colors.greenPrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.weekRow}>
                    {WEEK_DAYS.map((d) => (
                        <Text key={d} style={styles.weekLabel}>
                            {d}
                        </Text>
                    ))}
                </View>

                <View style={styles.grid}>
                    {grid.map((day, idx) => {
                        const today_ = isToday(day);
                        const selected_ = isSelected(day);
                        const hasAppt = day && hasConsulta(day);

                        return (
                            <TouchableOpacity
                                key={idx}
                                style={[
                                    styles.dayCell,
                                    today_ && !selected_ && styles.dayCellToday,
                                    selected_ && styles.dayCellSelected,
                                ]}
                                onPress={() => handleDayPress(day)}
                                disabled={!day}
                                activeOpacity={day ? 0.75 : 1}
                            >
                                {day ? (
                                    <>
                                        <Text
                                            style={[
                                                styles.dayText,
                                                today_ && !selected_ && styles.dayTextToday,
                                                selected_ && styles.dayTextSelected,
                                            ]}
                                        >
                                            {day}
                                        </Text>

                                        {hasAppt && (
                                            <View
                                                style={[
                                                    styles.dot,
                                                    selected_ && styles.dotSelected,
                                                ]}
                                            />
                                        )}
                                    </>
                                ) : null}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.legendRow}>
                    <View style={styles.dot} />
                    <Text style={styles.legendText}>Consulta agendada</Text>
                </View>
            </View>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Tem certeza?</Text>

                        <Text style={styles.modalText}>Deseja remarcar a consulta?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.btnCancelar}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text>Não</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btnConfirmar}
                                onPress={() => {
                                    navigation.navigate("DesmarcarConsulta")
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={{ color: "#fff" }}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {selectedConsultas && (
                <View style={styles.consultasSection}>
                    <View style={styles.sectionHeader}>
                        <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={colors.greenPrimary}
                        />
                        <Text style={styles.sectionTitle}>
                            Consultas — {selDay}/{selMonth}
                        </Text>
                    </View>

                    {selectedConsultas.map((c) => (
                        <View key={c.id} style={styles.cardWrapper}>
                            <CardConsulta
                                title={c.title}
                                text={c.text}
                                local={c.local}
                                onDesmarcar={handleDesmarcar}
                            />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const CELL_SIZE = `${(100 / 7).toFixed(4)}%`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
        paddingBottom: 48,
    },

    calendarCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 18,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    navBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: colors.text,
    },

    weekRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    weekLabel: {
        width: CELL_SIZE,
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '700',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: CELL_SIZE,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 2,
    },
    dayCellToday: {
        backgroundColor: colors.primaryLight,
    },
    dayCellSelected: {
        backgroundColor: colors.greenPrimary,
    },
    dayText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
    },
    dayTextToday: {
        color: colors.greenPrimary,
        fontWeight: '800',
    },
    dayTextSelected: {
        color: colors.white,
        fontWeight: '800',
    },

    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.greenPrimary,
        marginTop: 2,
    },
    dotSelected: {
        backgroundColor: colors.white,
    },

    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        // marginTop: 14,
        // paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
    },
    legendText: {
        fontSize: 12,
        color: colors.textSecondary,
    },

    consultasSection: {
        marginTop: 22,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    cardWrapper: {
        marginBottom: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    btnCancelar: {
        padding: 10,
    },
    btnConfirmar: {
        backgroundColor: colors.greenPrimary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
});