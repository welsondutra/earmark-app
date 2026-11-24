import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0c0d0f', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="light" />
      <Text style={{ color: '#f2f3f5', fontSize: 24, fontWeight: '700' }}>Earmark</Text>
    </View>
  );
}
