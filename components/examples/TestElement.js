import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import ModalContainer from "../elements/ModalContainer";
import ChatList from "../pages/ChatList";
import LoginScreen from "../pages/LoginScreen";

const TestElement = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupNumber, setPopupNumber] = useState(0);

    const openPopup = (number) => {
        setPopupNumber(number);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const renderPopup = ({ number }) => {
        return (
            <ModalContainer
                visible={isPopupVisible}
                onCloseRequest={closePopup}
            >
                {number === 0 ? <ChatList /> : <LoginScreen />}
            </ModalContainer>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
            }}
        >
            <Button title="Open Popup" onPress={() => openPopup(0)}>
                Открыть
            </Button>
            <Button title="Open Popup" onPress={() => openPopup(1)}>
                Открыть
            </Button>
            {renderPopup({ number: popupNumber })}
        </View>
    );
};

export default TestElement;
