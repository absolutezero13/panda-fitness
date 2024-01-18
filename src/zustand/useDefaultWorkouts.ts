import {create} from 'zustand';
import {assets} from '../assets';
import {ImageSourcePropType} from 'react-native';

export type DefaultWorkout = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  sets: number;
};

const DEFAULT_SETS = 3;

const INITIAL_DEFAULT_WORKOUTS: DefaultWorkout[] = [
  {
    id: '1',
    name: 'Pushups',
    image: assets.pushup,
    sets: DEFAULT_SETS,
  },
  {
    id: '2',
    name: 'Barbell Curl',
    image: assets.barbellCurl,
    sets: DEFAULT_SETS,
  },
  {
    id: '3',
    name: 'Bench Press',
    image: assets.benchPress,
    sets: DEFAULT_SETS,
  },
  {
    id: '4',
    name: 'Overhead Press',
    image: assets.overheadPress,
    sets: DEFAULT_SETS,
  },
  {
    id: '5',
    name: 'Squat',
    image: assets.squat,
    sets: DEFAULT_SETS,
  },
  {
    id: '6',
    name: 'Deadlift',
    image: assets.deadlift,
    sets: DEFAULT_SETS,
  },
];

type TUseDefaultWorkouts = {
  defaultWorkouts: DefaultWorkout[];
};

const useDefaultWorkouts = create<TUseDefaultWorkouts>(() => ({
  defaultWorkouts: INITIAL_DEFAULT_WORKOUTS,
}));

export default useDefaultWorkouts;
