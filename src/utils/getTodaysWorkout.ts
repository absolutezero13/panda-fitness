import dayjs from 'dayjs';
import {Workout} from '../zustand/useWorkoutStore';

const getTodaysWorkout = (workouts: Workout[]): Workout => {
  const today = dayjs().format('dddd');
  const todaysWorkout = workouts.find(workout => {
    return workout.day === today;
  });
  if (todaysWorkout) {
    return todaysWorkout;
  }
  return workouts[0];
};

export default getTodaysWorkout;
