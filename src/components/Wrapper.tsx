import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {themeColors} from '../theme/colors';

const Wrapper: FC<PropsWithChildren> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: themeColors.primary,
  },
});

export default Wrapper;
