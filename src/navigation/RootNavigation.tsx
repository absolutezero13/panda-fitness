import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as screens from '../screens';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddWorkout: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={screens.LoginScreen}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={screens.HomeScreen}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
