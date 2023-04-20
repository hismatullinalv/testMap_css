import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchUserFriends } from "../api/userApi";

const Friend = ({ name, online }) => {
    return (
        <View style={styles.friendContainer}>
            <Text style={styles.friendName}>{name}</Text>
            <Text
                style={[
                    styles.friendStatus,
                    online ? styles.online : styles.offline,
                ]}
            >
                {online ? "Online" : "Offline"}
            </Text>
        </View>
    );
};

export const FriendList = ({ navigation }) => {
    const [friends, setFriends] = useState([]);

    const loadFriends = async () => {
        try {
            const data = await fetchUserFriends();
            setFriends(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadFriends();
    }, []);

    return (
        <View style={styles.container}>
            {friends.map((friend) => (
                <Friend
                    key={friend.id}
                    name={friend.username}
                    online={friend.active}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    friendContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    friendName: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
    },
    friendStatus: {
        fontSize: 14,
        textTransform: "uppercase",
    },
    online: {
        color: "green",
    },
    offline: {
        color: "red",
    },
});
