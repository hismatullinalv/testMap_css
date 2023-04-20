import React, { useState } from 'react';
import { View } from 'react-native';
import FABMenu from '../elements/FABMenu';

const PopupPageExample = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FABMenu/>
        </View>
    );
};

export default PopupPageExample;