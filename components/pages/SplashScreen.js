import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { getCurrentUserId, refreshTokensHandler } from "../api/userApi";
import { API_BASE_URL } from "../api/server-config";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        checkLoggedInStatus();
    }, []);

    const checkLoggedInStatus = async () => {
        //await AsyncStorage.removeItem("accessToken");
        //1await AsyncStorage.removeItem("refreshToken");
        await AsyncStorage.setItem("accessToken", 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQHJ1LnJ1IiwiaWF0IjoxNjgxMjM2MDc1LCJleHAiOjE2ODI2NzYwNzV9.a5cB3FF4uw5JCsxIwQSgXI8GrMBMXRfl9gjyH_ouOOc');
        await AsyncStorage.setItem("refreshToken", 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQHJ1LnJ1IiwiaWF0IjoxNjgxMjM2MDc1LCJleHAiOjE2ODEzNjcxMTV9.pfQmFsxsfy_CND-sEVVXa0GmdfXMOdY8r9r5jRYIeIw');
        try {
            const currentTime = Date.now() / 1000;
            const accessToken = await AsyncStorage.getItem("accessToken");
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            if (!accessToken || !refreshToken) {
                return navigation.navigate("Login");
            }

            const decodedAccessToken = jwtDecode(accessToken);

            if (decodedAccessToken.exp < currentTime) {
                const decodedRefreshToken = jwtDecode(refreshToken);

                if (decodedRefreshToken.exp < currentTime) {
                    return navigation.navigate("Login");
                }

                const isRefreshed = await refreshTokensHandler(refreshToken);

                if (isRefreshed === true) {
                    console.log("tokens Refreshed");
                    const accessToken = await AsyncStorage.getItem(
                        "accessToken"
                    );
                    getCurrentUserId(accessToken);
                    navigation.navigate("Map");
                } else {
                    navigation.navigate("Login");
                }
            } else {
                getCurrentUserId(accessToken);
                navigation.navigate("Map");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Text>loading...</Text>
        </View>
    );
};

export default SplashScreen;
