import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 20 }}>
        Bet Tracker
      </Text>

      <Link href="/bets/create">➕ Create Bet</Link>
      <Link href="/bets/list">📃 View Bets</Link>
      <Link href="/notifications">🔔 Notifications</Link>
      <Link href="/friends">👥 Friends</Link>
    </View>
  );
}
