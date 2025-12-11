import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#4C6EF5',
    padding: 14,
    borderRadius: 8,
    marginTop: 10
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600'
  }
});
