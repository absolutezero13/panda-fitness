import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme/colors';
import useWorkoutStore from '../zustand/useWorkoutStore';
import dayjs from 'dayjs';
import WorkoutsEmptyState from '../components/EmptyState';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigation';

const HomeScreen = () => {
  const {workouts} = useWorkoutStore();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const todaysWorkout = workouts.find(workout => {
    return workout.day === dayjs().format('dddd');
  });

  const isEmpty = todaysWorkout?.exercises.length === 0;

  const onAddWorkoutPress = () => {
    navigate('AddWorkout');
  };

  return (
    <Wrapper>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text style={styles.title}>Today's Workout</Text>
          <View style={styles.todaysWorkoutsWrapper}>
            <FlatList
              data={todaysWorkout?.exercises}
              ListEmptyComponent={() => (
                <WorkoutsEmptyState onPress={onAddWorkoutPress} />
              )}
              contentContainerStyle={{flexGrow: isEmpty ? 1 : 0}}
              renderItem={({item}) => (
                <View>
                  <Text>{item.name}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.light,
  },
  todaysWorkoutsWrapper: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: themeColors.secondary,
    flex: 1,
    borderRadius: 10,
  },
});

export default HomeScreen;
