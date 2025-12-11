import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      router.replace('/'); // go to home
    } else {
      router.replace('/auth/login');
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Loading...</Text>
    </View>
  );
}
