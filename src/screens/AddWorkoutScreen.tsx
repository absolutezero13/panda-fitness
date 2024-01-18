import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import useDefaultWorkouts, {
  DefaultWorkout,
} from '../zustand/useDefaultWorkouts';
import Wrapper from '../components/Wrapper';
import {FlatList} from 'react-native-gesture-handler';
import useWorkoutStore, {UserExercise} from '../zustand/useWorkoutStore';
import {Workout} from '../components/Workout';

const AddWorkoutScreen = () => {
  const {todaysWorkout, setTodaysWorkout} = useWorkoutStore();
  const {defaultWorkouts} = useDefaultWorkouts();

  const onAddWorkoutPress = (item: DefaultWorkout, sets: number) => {
    const existingWorkout = todaysWorkout.exercises.find(
      workout => workout.id === item.id,
    );
    if (!existingWorkout) {
      const newWorkout: UserExercise = {
        id: item.id,
        name: item.name,
        image: item.image,
        sets,
      };

      setTodaysWorkout({
        ...todaysWorkout,
        exercises: [...todaysWorkout.exercises, newWorkout],
      });
      Alert.alert('Success', 'Workout updated successfully');
      return;
    }

    const updatedWorkout: UserExercise = {
      ...existingWorkout,
      sets: existingWorkout.sets + sets,
    };

    const updatedExercises = todaysWorkout.exercises.map(workout =>
      workout.id === item.id ? updatedWorkout : workout,
    );

    setTodaysWorkout({
      ...todaysWorkout,
      exercises: updatedExercises,
    });

    Alert.alert('Success', 'Workout updated successfully');
  };

  return (
    <Wrapper>
      <FlatList
        data={defaultWorkouts}
        renderItem={({item}) => (
          <Workout item={item} addMode={true} onPress={onAddWorkoutPress} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  content: {paddingBottom: 20},
});

export default AddWorkoutScreen;
