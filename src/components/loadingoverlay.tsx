import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
  visible: boolean;
  message?: string;
}

export const LoadingOverlay = ({ visible, message = 'Loading...' }: Props) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});