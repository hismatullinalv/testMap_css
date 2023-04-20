import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Animated,
  BackHandler,
  TouchableWithoutFeedback,
  PanResponder
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ModalContainer = ({ visible, onCloseRequest, children }) => {
  let translateY = new Animated.Value(SCREEN_HEIGHT);
  let opacity = new Animated.Value(0);

  const MIN_TRANSLATE_Y = 0; // Минимальное значение translateY
  const SWIPE_THRESHOLD = SCREEN_HEIGHT * 0.4; // Порог смахивания для закрытия окна

  // Обработчик нажатий
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gesture) => {      
      // Ограничение на значения translateY
      if (gesture.dy < MIN_TRANSLATE_Y) {
        translateY.setValue(MIN_TRANSLATE_Y);
      } else {
        translateY.setValue(gesture.dy);
      }
    },
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy > SWIPE_THRESHOLD) {
        handleClose();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true
        }).start(() => {
        });
      }
    },
  });


  // Анимация открытия
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [visible]);

  // Функция закрытия с анимацией
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      onCloseRequest();
    });
  }

  // Листнер на закрытие при нажатии кнопки "Назад"
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        handleClose();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [visible]);

  const backgroundStyle = {
    ...styles.background,
    opacity: opacity,
    display: visible ? 'flex' : 'none'
  }

  const containerStyle = {
    ...styles.container,
    transform: [{ translateY: translateY }]
  };

  return(
    <TouchableWithoutFeedback onPress={handleClose}>
      <Animated.View style={backgroundStyle}>
        <Animated.View style={containerStyle} {...panResponder.panHandlers}>
          <View style={styles.line}/>
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  container: {
    height: SCREEN_HEIGHT * 0.9,
    width: '100%',
    backgroundColor: '#aaaaaa',
    position: 'absolute',
    alignContent: 'center',
    top: '10%',
    borderRadius: 25,
  },
  line: {
    height: 4,
    backgroundColor: 'black',
    width: 70,
    position: 'absolute',
    top: '1%',
    left: '50%',
    marginTop: -1,
    marginLeft: -35,
    borderRadius: 5,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    top: '2%',
    overflow: 'hidden',
  },
})

export default ModalContainer;