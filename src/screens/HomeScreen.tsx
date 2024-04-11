import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme/colors';
import useWorkoutStore from '../zustand/useWorkoutStore';
import WorkoutsEmptyState from '../components/EmptyState';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigation';
import {Workout} from '../components/Workout';
import AddWorkoutButton from '../components/AddWorkout';
import {updateWorkouts} from '../utils/updateWorkouts';
import {DefaultWorkout} from '../zustand/useDefaultWorkouts';
import AppButton from '../components/AppButton';
import dayjs from 'dayjs';

const HomeScreen = () => {
  const workoutStore = useWorkoutStore();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const todaysWorkout = workoutStore[dayjs().day()];

  const isEmpty = todaysWorkout?.exercises.length === 0;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const onAddWorkoutPress = () => {
    navigate('AddWorkout');
  };

  const onAddOrMinusPress = (item: DefaultWorkout, value: number) => {
    updateWorkouts(item, value, false);
  };

  const onClearPress = () => {
    useWorkoutStore.setState({
      [dayjs().day()]: {
        ...todaysWorkout,
        exercises: [],
      },
    });
  };

  return (
    <Wrapper>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Today's Workout ({dayjs().format('dddd')})
          </Text>
          <View style={styles.todaysWorkoutsWrapper}>
            <FlatList
              data={todaysWorkout?.exercises}
              ListEmptyComponent={() => (
                <WorkoutsEmptyState onPress={onAddWorkoutPress} />
              )}
              style={styles.flexGrow}
              contentContainerStyle={styles.flexGrow}
              ListFooterComponent={
                isEmpty
                  ? undefined
                  : () => (
                      <AppButton
                        style={{marginTop: 24}}
                        title="Clear"
                        onPress={onClearPress}
                      />
                    )
              }
              renderItem={({item}) => (
                <Workout
                  item={item}
                  addMode={false}
                  onAddOrMinusPress={onAddOrMinusPress}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View style={styles.addButton}>
          {!isEmpty && <AddWorkoutButton onPress={onAddWorkoutPress} />}
        </View>
      </SafeAreaView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.light,
  },
  todaysWorkoutsWrapper: {
    marginTop: 20,
    borderColor: themeColors.secondary,
    flex: 1,
    borderRadius: 10,
  },
  addButton: {
    alignSelf: 'center',
    paddingBottom: 24,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default HomeScreen;
