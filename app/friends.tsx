import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    loadFriends();
  }, []);

  async function loadFriends() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const { data, error } = await supabase
      .from('friendships')
      .select('friend_id, friend:auth.users(email)')
      .eq('user_id', user.id);

    setFriends(data || []);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Friends</Text>

      {friends.map(f => (
        <Text key={f.friend_id}>{f.friend.email}</Text>
      ))}
    </View>
  );
}
