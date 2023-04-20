import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./server-config";
import { getCurrentUserId } from "./userApi";
const API_URL = API_BASE_URL + "/api/v1/auth/";

export const authenticateHandle = async (email, password) => {
    try {
        const response = await fetch(API_URL + "authenticate", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if (response.status === 200) {
            const responseData = await response.json();
            await AsyncStorage.setItem("accessToken", responseData.accessToken);
            await AsyncStorage.setItem(
                "refreshToken",
                responseData.refreshToken
            );
            getCurrentUserId(responseData.accessToken);
        } else if (response.status === 403) {
            console.log("Invalid credentials");
        }
    } catch (error) {
        throw new Error("Error during Login");
    }
};

export const registrationHandle = async (username, email, password) => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    try {
        const response = await fetch(API_URL + "registration", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });
        if (response.status === 200) {
            const responseData = await response.json();
            console.log(responseData);
            await AsyncStorage.setItem("accessToken", responseData.accessToken);
            await AsyncStorage.setItem(
                "refreshToken",
                responseData.refreshToken
            );
            getCurrentUserId(responseData.accessToken);
        } else if (response.status === 409) {
            console.log(responseData);
        } else if (response.status === 500) {
            console.log(responseData);
        } else {
            const responseData = await response.json();
            console.log(responseData);
        }
    } catch (error) {
        throw new Error("Error during registration");
    }
};
