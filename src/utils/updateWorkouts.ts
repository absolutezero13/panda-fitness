import {Alert} from 'react-native';
import {DefaultWorkout} from '../zustand/useDefaultWorkouts';
import useWorkoutStore, {
  TWorkoutStore,
  UserExercise,
} from '../zustand/useWorkoutStore';
import getTodaysWorkout from './getTodaysWorkout';

export const updateWorkouts = (
  item: DefaultWorkout,
  sets: number,
  shouldShowAlert = true,
) => {
  const workoutsStore = useWorkoutStore.getState() as TWorkoutStore;
  const workouts = workoutsStore.workouts;
  const todaysWorkout = getTodaysWorkout(workouts);
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

    const newTodaysWorkout = {
      ...todaysWorkout,
      exercises: [...todaysWorkout.exercises, newWorkout],
    };

    const newWeeklyWorkouts = workouts.map(workout => {
      if (workout.day === todaysWorkout.day) {
        return newTodaysWorkout;
      }

      return workout;
    });

    useWorkoutStore.setState({workouts: newWeeklyWorkouts});
    if (shouldShowAlert) {
      Alert.alert('Success', 'Workout updated successfully');
    }
    return;
  }

  const updatedWorkout: UserExercise = {
    ...existingWorkout,
    sets: existingWorkout.sets + sets,
  };

  const updatedExercises = todaysWorkout.exercises.map(workout =>
    workout.id === item.id ? updatedWorkout : workout,
  );

  const updatedTodaysWorkout = {
    ...todaysWorkout,
    exercises: updatedExercises,
  };

  const updatedWeeklyWorkouts = workouts.map(workout => {
    if (workout.day === todaysWorkout.day) {
      return updatedTodaysWorkout;
    }

    return workout;
  });

  useWorkoutStore.setState({workouts: updatedWeeklyWorkouts});

  if (shouldShowAlert) {
    Alert.alert('Success', 'Workout updated successfully');
  }
};
