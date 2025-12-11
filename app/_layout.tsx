import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="bets/create" options={{ title: "Create Bet" }} />
      <Stack.Screen name="bets/list" options={{ title: "My Bets" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="friends" options={{ title: "Friends" }} />
    </Stack>
  );
}
