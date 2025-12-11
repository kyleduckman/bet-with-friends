import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function BetList() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    fetchBets();
  }, []);

  async function fetchBets() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const { data } = await supabase
      .from('bets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setBets(data || []);
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>My Bets</Text>

      {bets.map(b => (
        <View key={b.id} style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{b.description}</Text>
          <Text>Odds: {b.odds}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
