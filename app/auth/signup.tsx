import { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful! Please check your email to verify.");
    router.replace('/auth/login');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Sign Up</Text>

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} />

      <Button title="Create Account" onPress={signUp} />

      <Text style={{ marginTop: 20 }}>
        Already have an account?  
        <Text style={{ color: 'blue' }} onPress={() => router.push('/auth/login')}>
          Log in
        </Text>
      </Text>
    </View>
  );
}
