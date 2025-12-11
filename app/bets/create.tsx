import { View, Text } from 'react-native';
import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { supabase } from '../../lib/supabase';

export default function CreateBet() {
  const [team, setTeam] = useState('');
  const [betType, setBetType] = useState('');
  const [odds, setOdds] = useState('');

  async function createBet() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    // 1. Insert bet
    const { data: bet } = await supabase
      .from('bets')
      .insert({
        user_id: user.id,
        team,
        bet_type: betType,
        odds: parseInt(odds, 10),
        description: `${team} ${betType}`
      })
      .select()
      .single();

    // 2. Get friends
    const { data: friends } = await supabase
      .from('friendships')
      .select('friend_id')
      .eq('user_id', user.id);

    // 3. Create notifications for each friend
    for (let f of friends) {
      await supabase.from('notifications').insert({
        sender_id: user.id,
        receiver_id: f.friend_id,
        message: `${user.email} is riding ${team} ${betType} tonight — care to tail?`
      });
    }

    alert("Bet added and friends notified!");
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 20 }}>Create Bet</Text>

      <Input placeholder="Team" value={team} onChangeText={setTeam} />
      <Input placeholder="Bet Type (ML, Spread...)" value={betType} onChangeText={setBetType} />
      <Input placeholder="Odds (-120)" value={odds} onChangeText={setOdds} />

      <Button title="Submit Bet" onPress={createBet} />
    </View>
  );
}
