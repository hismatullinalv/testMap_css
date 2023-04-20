import React from 'react';
import { StyleSheet, View } from 'react-native';
import FollowingElement from '../elements/FollowingElement';

const FollowingElementExample = () => {
  return (
    <View style={styles.container}>
      <FollowingElement />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FollowingElementExample;