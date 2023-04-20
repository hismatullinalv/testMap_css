import { API_BASE_URL } from "./server-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = API_BASE_URL + "/api/v1/user/";

export const refreshTokensHandler = async (refreshToken) => {
    try {
        const response = await fetch(API_URL + "refresh", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + refreshToken,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const responseData = await response.json();
            await AsyncStorage.setItem("accessToken", responseData.accessToken);
            await AsyncStorage.setItem(
                "refreshToken",
                responseData.refreshToken
            );
            return true;
        } else if (response.status === 403) {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");
            return false;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        throw new Error("Error during refreshing tokens");
    }
};

export const fetchUserFriends = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(API_URL + "friends", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const responseData = await response.json();
            return responseData;
        } else if (response.status === 403) {
            console.log("Invalid credentials");
        }
    } catch (error) {
        throw new Error("Error during fetching user friends");
    }
};

export const fetchRecipientInfo = async (userId) => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(API_URL + "?id=" + userId, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const responseData = await response.json();
            return responseData;
        } else if (response.status === 403) {
            console.log("Invalid credentials");
        }
    } catch (error) {
        throw new Error("Error during fetching recipient info");
    }
};

export const getCurrentUserId = async (token) => {
    try {
        const response = await fetch(API_URL + "userId", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const responseData = await response.json();
            await AsyncStorage.setItem("userId", responseData.id);
        } else if (response.status === 403) {
            console.log("Invalid credentials getCurrentUserId");
        }
    } catch (error) {
        throw new Error("Error during getting current user Id");
    }
};
