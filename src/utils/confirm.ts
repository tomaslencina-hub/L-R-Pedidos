import { Alert, Platform } from 'react-native';

/** `Alert.alert` buttons do nothing on web, so fall back to the browser dialog there. */
export function confirm(title: string, message: string, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Aceptar', onPress: onConfirm },
  ]);
}
