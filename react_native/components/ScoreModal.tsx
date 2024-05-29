import React from 'react';
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';

interface ScoreModalProps {
  visible: boolean;
  score: number;
  total: number;
  onClose: () => void;
}

const ScoreModal = ({ visible, score, total, onClose }: ScoreModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Your Score: {score}/{total}</Text>
          <Pressable
            style={[styles.button, styles.modalButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#00695c',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#004d40',
  },
  modalButton: {
    marginTop: 10,
  },
});

export default ScoreModal;
