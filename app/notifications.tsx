import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Notifications() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
    subscribeRealtime();
  }, []);

  async function loadNotes() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('receiver_id', user.id)
      .order('created_at', { ascending: false });

    setNotes(data || []);
  }

  function subscribeRealtime() {
    supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', table: 'notifications' },
        (payload) => {
          setNotes(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Notifications</Text>

      {notes.map(n => (
        <View key={n.id} style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 18 }}>{n.message}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
