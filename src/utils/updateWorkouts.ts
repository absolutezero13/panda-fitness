import {Alert} from 'react-native';
import {DefaultWorkout} from '../zustand/useDefaultWorkouts';
import useWorkoutStore, {
  TWorkoutStore,
  UserExercise,
} from '../zustand/useWorkoutStore';
import dayjs from 'dayjs';

export const updateWorkouts = (
  item: DefaultWorkout,
  sets: number,
  shouldShowAlert = true,
) => {
  const workoutsStore = useWorkoutStore.getState() as TWorkoutStore;
  const todaysWorkout = workoutsStore[dayjs().day()];
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

    useWorkoutStore.setState({[dayjs().day()]: newTodaysWorkout});
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

  useWorkoutStore.setState({[dayjs().day()]: updatedTodaysWorkout});

  if (shouldShowAlert) {
    Alert.alert('Success', 'Workout updated successfully');
  }
};
