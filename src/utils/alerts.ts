import { Alert, Platform } from 'react-native';

/**
 * react-native-web's Alert.alert is a no-op, so plain Alert calls silently
 * do nothing when this app runs in a browser. These helpers fall back to
 * window.alert/confirm on web while using the native Alert API elsewhere.
 */
export function showAlert(title: string, message?: string) {
  if (Platform.OS === 'web') {
    (globalThis as { alert?: (msg: string) => void }).alert?.(message ? `${title}\n\n${message}` : title);
  } else {
    Alert.alert(title, message);
  }
}

export function showConfirm(title: string, message: string, onConfirm: () => void, confirmLabel = 'Confirm') {
  if (Platform.OS === 'web') {
    const confirmed = (globalThis as { confirm?: (msg: string) => boolean }).confirm?.(`${title}\n\n${message}`);
    if (confirmed) onConfirm();
  } else {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: confirmLabel, style: 'destructive', onPress: onConfirm },
    ]);
  }
}
