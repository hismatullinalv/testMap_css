import React from 'react'
import { gStyle, theme } from '../../styles/style';
import { Provider as PaperProvider, TextInput, Button } from 'react-native-paper';

import HeaderElement from '../elements/HeaderElement';
import { ScrollView } from 'react-native';

export default function ExamplesPage({ navigation }) {
    const loadRegistration = () => {
        navigation.navigate('Registration');
    }
    const loadLogin = () => {
        navigation.navigate('Login');
    }
    const loadMap = () => {
        navigation.navigate('Map')
    }
    const loadPopupPage = () => {
        navigation.navigate('PopupPageExample')
    }
    const loadFriendsPage = () => {
        navigation.navigate('FriendList')
    }
    const loadFABMenu = () => {
        navigation.navigate('FABMenu')
    }
    const loadFollowingElementExample = () => {
        navigation.navigate('FollowingElementExample')
    }
    const loadTestWElement = () => {
        navigation.navigate('TestElement')
    }
    const loadChatList = () => {
        navigation.navigate('ChatList')
    }
    const loadPersonalPageExample = () => {
        navigation.navigate('PersonalPageExample')
    }
    const loadChatPage = () => {
        navigation.navigate('ChatPage')
    }    
    const loadAnimatedInputExample = () => {
        navigation.navigate('AnimatedInputExample')
    }   
    const loadFriendPage = () => {
        navigation.navigate('FriendPage')
    }
    const loadEstablishmentPageExample = () => {
        navigation.navigate('EstablishmentPageExample')
    }



    return (
        <PaperProvider theme={theme} style={{}}>
            <ScrollView>
                <HeaderElement title="Элементы"/>
                <Button style={gStyle.testButton} mode='contained' onPress={loadPopupPage}>Всплывающее окно</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadFABMenu}>Меню</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadFollowingElementExample}>Перемещаемый элемент</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadAnimatedInputExample}>Поле ввода</Button>
                
                
                <Button style={gStyle.testButton} mode='contained' onPress={loadTestWElement}>Тест какого-то элемента</Button>


                <HeaderElement title="Страницы"/>
                <Button style={gStyle.testButton} mode='contained' onPress={loadRegistration}>Регистрация</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadLogin}>Логин</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadMap}>Карта</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadFriendsPage}>Друзья</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadChatList}>Чаты</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadPersonalPageExample}>Страница</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadChatPage}>Чат</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadFriendPage}>Страница друга</Button>
                <Button style={gStyle.testButton} mode='contained' onPress={loadEstablishmentPageExample}>Страница заведения</Button>
            </ScrollView>
        </PaperProvider>
    );
}

