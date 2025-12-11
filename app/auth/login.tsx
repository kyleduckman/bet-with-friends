import { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.replace('/');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Login</Text>

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} />

      <Button title="Sign In" onPress={signIn} />

      <Text style={{ marginTop: 20 }}>
        Don't have an account?  
        <Text style={{ color: 'blue' }} onPress={() => router.push('/auth/signup')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}
