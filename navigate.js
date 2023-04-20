import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ExamplesPage from "./components/pages/ExamplesPage";
import LoginScreen from "./components/pages/LoginScreen";
import RegistrationScreen from "./components/pages/RegistrationScreen";
import Map from "./components/pages/Map";
import PopupPageExample from "./components/examples/PopupPageExample";
import { FriendList } from "./components/pages/FriendList";
import FABMenu from "./components/elements/FABMenu";
import FollowingElementExample from "./components/examples/FollowingElementExample";
import TestElement from "./components/examples/TestElement";
import ChatList from "./components/pages/ChatList";
import PersonalPageExample from "./components/examples/PersonalPageExample";
import ChatPage from "./components/pages/ChatPage";
import AnimatedInputExample from "./components/examples/AnimatedInputExample";
import FriendPage from "./components/pages/FriendPage";
import FriendPageExample from "./components/examples/FriendPageExample";
import EstablishmentPageExample from "./components/examples/EstablishmentPageExample";
import SplashScreen from "./components/pages/SplashScreen";
import SettingsPage from "./components/pages/SettingsPage";

const Stack = createStackNavigator();

export function Navigate() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Map"
                    component={Map}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="FriendList"
                    component={FriendList}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="FABMenu"
                    component={FABMenu}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="FollowingElementExample"
                    component={FollowingElementExample}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="TestElement"
                    component={TestElement}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="ChatList"
                    component={ChatList}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="PersonalPageExample"
                    component={PersonalPageExample}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="ChatPage"
                    component={ChatPage}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="AnimatedInputExample"
                    component={AnimatedInputExample}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="FriendPage"
                    component={FriendPageExample}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="EstablishmentPageExample"
                    component={EstablishmentPageExample}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SettingsPage"
                    component={SettingsPage}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
