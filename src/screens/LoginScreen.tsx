import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {themeColors} from '../theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {assets} from '../assets';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {};

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={assets.pandaLogo}
        style={{width: 200, height: 200, alignSelf: 'center', marginBottom: 48}}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor={themeColors.light}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        placeholderTextColor={themeColors.light}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleLogin}>
        <Text style={{color: themeColors.primary}}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: themeColors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: themeColors.light,
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.secondary,
    borderRadius: 8,
    color: themeColors.light,
    padding: 12,
    marginBottom: 24,
    fontSize: 18,
  },
  button: {
    backgroundColor: themeColors.light,
    padding: 12,
    marginTop: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default LoginScreen;
