import React, {useState} from 'react';
import {Text, TextInput, StyleSheet, Image, View} from 'react-native';
import {themeColors} from '../theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {assets} from '../assets';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigation';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {SCREEN_WIDTH} from '../theme/sizes';

const LoginScreen = () => {
  const {dispatch} = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(StackActions.replace('Home'));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>
        <Image source={assets.pandaLogo} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          placeholderTextColor={themeColors.light}
          onChangeText={setEmail}
          autoCapitalize="none"
          cursorColor={themeColors.light}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor={themeColors.light}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
          cursorColor={themeColors.light}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleLogin}>
          <Text style={{color: themeColors.primary}}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: themeColors.primary,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    alignSelf: 'center',
    marginBottom: 48,
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
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default LoginScreen;
