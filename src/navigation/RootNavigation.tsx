import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as screens from '../screens';
import {themeColors} from '../theme/colors';

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
        <Stack.Screen
          name="AddWorkout"
          options={{
            presentation: 'modal',
            headerTitle: 'Add Workout',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: themeColors.primary,
            },
            headerTintColor: themeColors.light,
          }}
          component={screens.AddWorkoutScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
