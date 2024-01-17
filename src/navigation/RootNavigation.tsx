import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as screens from '../screens';

const Stack = createStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
