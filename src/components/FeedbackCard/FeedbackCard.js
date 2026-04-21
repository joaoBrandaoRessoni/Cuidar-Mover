import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedbackCard({ type = 'error', message }) {
  if (!message) return null;

  const config = {
    error: {
      bg: '#FDECEC',
      border: '#E03131',
      icon: 'alert-circle',
      color: '#C92A2A',
    },
    success: {
      bg: '#E6FCF5',
      border: '#0CA678',
      icon: 'checkmark-circle',
      color: '#087F5B',
    },
    warning: {
      bg: '#FFF4E6',
      border: '#F08C00',
      icon: 'warning',
      color: '#D9480F',
    },
  };

  const current = config[type];

  return (
    <View style={{paddingHorizontal: 35}}>
        <View style={[styles.container, { backgroundColor: current.bg, borderLeftColor: current.border }]}>
          <Ionicons name={current.icon} size={22} color={current.color} />
          <Text style={[styles.text, { color: current.color }]}>
            {message}
          </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 5,
    marginVertical: 10,
    
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
});