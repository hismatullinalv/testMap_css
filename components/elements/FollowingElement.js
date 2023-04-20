import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';

const FollowingElement = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const pan = useRef(new Animated.ValueXY({ x: x, y: 50 })).current;
  const [following, setFollowing] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      Animated.spring(pan, { toValue: { x: x, y: y }, useNativeDriver: false }).start(() => setFollowing(false));
    },
    onPanResponderGrant: () => {
      setFollowing(true);
    },
    onPanResponderTerminate: () => {
      setFollowing(false);
    },
    onPanResponderMove: (evt, gestureState) => {
      pan.setValue({ x: gestureState.dx + x, y: gestureState.dy + y });
    },
  });

  const followingStyle = following ? styles.following : {};

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.follower, followingStyle, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      />
      <Animated.View
        style={[styles.follower, followingStyle, { transform: [{ translateX: Animated.add(pan.x, 100) }, { translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  follower: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
  following: {
    backgroundColor: 'green',
  },
});

export default FollowingElement;