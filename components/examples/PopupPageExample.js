/*import React from 'react';
import { FlatList, View } from 'react-native';
import { CompactRestaurantInfo } from '../../componentsYM/CompactRestaurantInfo/CompactRestaurantInfo';

const restaurants = [
  { id: '1', name: 'Restaurant A', photos: ['../../assets/icon.png'] },
  { id: '2', name: 'Restaurant B', photos: ['../../assets/icon.png'] },
  { id: '3', name: 'Restaurant C', photos: ['../../assets/icon.png'] },
];

export const PopupPageExample = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <CompactRestaurantInfo restaurant={item} />}
        keyExtractor={(item) => item.id}
        horizontal={true}
      />
    </View>
  );
};

export default PopupPageExample;

*/
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import PopupPage from '../elements/PopupPage';
import LoginScreen from '../pages/LoginScreen';
import ModalContainer from '../elements/ModalContainer';

const PopupPageExample = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Open Popup" onPress={ openPopup }>Открыть</Button>
            <ModalContainer visible={isPopupVisible} onCloseRequest={ closePopup }>
                <LoginScreen/>
            </ModalContainer>
        </View>
    );
};

export default PopupPageExample;