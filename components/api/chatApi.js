import { API_BASE_URL } from "./server-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = API_BASE_URL + "/api/v1/chat/";

export const fetchUserChats = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(API_URL + "userChats", {
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
        throw new Error("Error during fetching user chats");
    }
};

export const fetchChatMessages = async (chatId, offset) => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
            API_URL + "?id=" + chatId + "&offset=" + offset,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        if (response.status === 200) {
            const responseData = await response.json();
            return responseData;
        } else if (response.status === 403) {
            console.log("Invalid credentials");
        }
    } catch (error) {
        throw new Error("Error during fetching chat messages");
    }
};
