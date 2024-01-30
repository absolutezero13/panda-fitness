import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import useDefaultWorkouts from '../zustand/useDefaultWorkouts';
import Wrapper from '../components/Wrapper';
import {FlatList} from 'react-native-gesture-handler';
import {Workout} from '../components/Workout';
import {updateWorkouts} from '../utils/updateWorkouts';
import BottomSheet from '@gorhom/bottom-sheet';
import {themeColors} from '../theme/colors';

const AddWorkoutScreen = () => {
  const {defaultWorkouts} = useDefaultWorkouts();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [sets, setSets] = useState(0);

  const snapPoints = ['25%', '50%'];

  return (
    <Wrapper>
      <FlatList
        data={defaultWorkouts}
        renderItem={({item}) => (
          <Workout
            item={item}
            addMode={true}
            onPress={() => bottomSheetRef.current?.expand()}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={props => (
          <View style={[{backgroundColor: 'red'}]} />
        )}>
        <View style={styles.inputsWrapper}>
          <Text style={styles.inputText}> Sets </Text>
          <TextInput
            style={styles.input}
            value={sets.toString()}
            placeholderTextColor={themeColors.light}
            onChangeText={(text: string) => {
              if (Number.isNaN(parseInt(text, 10))) {
                setSets(0);
              }

              setSets(text ? parseInt(text, 10) : 0);
            }}
            keyboardType="numeric"
            autoCapitalize="none"
            cursorColor={themeColors.light}
          />
        </View>
      </BottomSheet>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  inputsWrapper: {alignSelf: 'center'},
  content: {paddingBottom: 20},
  input: {
    borderWidth: 1,
    borderColor: themeColors.secondary,
    borderRadius: 8,
    color: themeColors.primary,
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 'bold',
    width: 60,
    textAlign: 'center',
  },
  inputText: {
    color: themeColors.primary,
    marginBottom: 2,
    textAlign: 'center',
  },
  sets: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: themeColors.primary,
  },
  setsText: {
    color: themeColors.primary,
    textAlign: 'center',
  },
});

export default AddWorkoutScreen;
