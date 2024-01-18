import React from 'react';
import {StyleSheet} from 'react-native';
import useDefaultWorkouts from '../zustand/useDefaultWorkouts';
import Wrapper from '../components/Wrapper';
import {FlatList} from 'react-native-gesture-handler';
import {Workout} from '../components/Workout';
import {updateWorkouts} from '../utils/updateWorkouts';

const AddWorkoutScreen = () => {
  const {defaultWorkouts} = useDefaultWorkouts();

  return (
    <Wrapper>
      <FlatList
        data={defaultWorkouts}
        renderItem={({item}) => (
          <Workout item={item} addMode={true} onPress={updateWorkouts} />
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
