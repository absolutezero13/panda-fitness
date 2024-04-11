import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {ImageSourcePropType} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {create} from 'zustand';

const mmkv = new MMKVLoader().initialize();

dayjs.extend(localeData);

export type UserExercise = {
  id: string;
  name: string;
  sets: number;
  image: ImageSourcePropType;
};

export type DailyWorkout = {
  exercises: UserExercise[];
  day: string;
  id: string;
};

export type TWorkoutStore = {[key: string]: DailyWorkout};

// create data from week days
const createInitialState = (): TWorkoutStore => {
  const dailyWorkouts: TWorkoutStore = {};

  dayjs.weekdays().forEach((day: string, index: number) => {
    dailyWorkouts[day] = {
      exercises: [],
      day,
      id: index.toString(),
    };
  });

  return dailyWorkouts;
};

const useWorkoutStore = create(
  persist<TWorkoutStore>(
    () => ({
      ...createInitialState(),
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => mmkv as any),
    },
  ),
);

export default useWorkoutStore;
