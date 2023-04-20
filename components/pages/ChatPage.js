import React, { memo, useEffect, useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchChatMessages } from "../api/chatApi";
import { fetchRecipientInfo } from "../api/userApi";
import { API_BASE_URL } from "../api/server-config";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileHeader = ({ username, online, imgUri }) => {
    return (
        <View style={styles.profContainer}>
            <Image style={styles.avatar} source={{ uri: imgUri }} />
            <View style={styles.textContainer}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.status}>
                    {online ? "Online" : "Offline"}
                </Text>
            </View>
        </View>
    );
};

const ChatPage = ({ navigation, route }) => {
    const Messagescopy = useRef([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [header, setHeader] = useState([]);
    const [numberOfMessages, setNumberOfMessages] = useState(0);
    const flatListRef = useRef(null);
    const offset = useRef(0);
    const { chatId, recipientId } = route.params;
    const noMoreMessages = useRef(false);
    const data = useRef(null);
    const currentUserId = useRef(null);
    const stompClient = useRef(null);

    const loadMessages = async () => {
        try {
            data.current = await fetchChatMessages(chatId, offset.current);
            offset.current += 50;
            setMessages(data.current.messagePojoList);
            setNumberOfMessages(numberOfMessages + data.current.messagesLength);
        } catch (error) {
            console.error(error);
        }
    };

    const loadChatHeader = async () => {
        try {
            currentUserId.current = await AsyncStorage.getItem("userId");
            const response = await fetchRecipientInfo(recipientId);
            setHeader(response);
        } catch (error) {
            console.error(error);
        }
    };

    const loadMoreMessages = async () => {
        try {
            if (!noMoreMessages.current) {
                data.current = await fetchChatMessages(chatId, offset.current);
                console.log("fetching messages");
                offset.current += 50;
                const newMessages = [
                    ...messages,
                    ...data.current.messagePojoList,
                ];
                setMessages(newMessages);
                setNumberOfMessages(
                    numberOfMessages + data.current.messagesLength
                );
            }
            if (data.current.messagesLength < 50) {
                noMoreMessages.current = true;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => {
        const isSent = item.senderId === recipientId;
        const msgStyle = isSent ? styles.receive : styles.send;

        const timeArr = item.sendAtTime.split(":");
        const timeArr2 = timeArr[2].split(".")[0];
        const formattedTime = `${timeArr[0]}:${timeArr[1]}:${timeArr2}`;
        return (
            <View style={[styles.chatItemCommon, msgStyle]}>
                <Text style={styles.msgtxt}>{item.text}</Text>
                <Text style={styles.msgtime}>{formattedTime}</Text>
            </View>
        );
    };

    const socketConnect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS(API_BASE_URL + "/ws");
        stompClient.current = Stomp.over(SockJS);
        stompClient.current.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        stompClient.current.subscribe(
            "/user/" + currentUserId.current + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        console.log("сообщение получено");

        const notification = JSON.parse(msg.body);
        setMessages((prevMessages) => [notification, ...prevMessages]);
        setNumberOfMessages(numberOfMessages + 1);
    };

    useEffect(() => {
        offset.current = 0;
        loadChatHeader();
        loadMessages();
        socketConnect();
        return () => {
            stompClient.current.unsubscribe();
        };
    }, []);

    const sendMessage = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const time = `${hours}:${minutes}:${seconds}`;
        const newMessage = {
            messageId: uuid.v1(),
            chatId: chatId,
            senderId: currentUserId.current,
            recipientId: recipientId,
            text: message,
            sendAtTime: time,
        };
        stompClient.current.send("/app/chat", {}, JSON.stringify(newMessage));
        const newMessages = [newMessage, ...messages];
        setMessages(newMessages);
        setMessage("");
    };

    return (
        <View style={styles.container}>
            <ProfileHeader
                username={header.username}
                online={header.active}
                imgUri="https://sun9-22.userapi.com/impf/c855028/v855028839/cf38b/TOQ5sQ175mw.jpg?size=1620x2160&quality=96&sign=237f0e326daf7805f5f37b3417730b5d&type=album"
            />
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(x) => x.messageId.toString()}
                renderItem={renderItem}
                inverted
                contentContainerStyle={styles.listStyle}
                onEndReached={noMoreMessages.current ? null : loadMoreMessages}
                onEndReachedThreshold={0.1}
            />
            <View style={styles.bottom}>
                <TextInput
                    style={styles.input}
                    value={message}
                    placeholder="Type your message"
                    onChangeText={setMessage}
                    multiline
                    maxLength={1000}
                    blurOnSubmit={false}
                    returnKeyType="send"
                    onSubmitEditing={null}
                />
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={message.length > 0 ? sendMessage : null}
                >
                    <Ionicons
                        name="send"
                        size={25}
                        color={message.length > 0 ? "#0277bd" : "#9e9e9e"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    header: {
        height: 60,
        backgroundColor: "#4267B2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    chatItemCommon: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: "75%",
    },
    send: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C6",
    },
    receive: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
    },
    msgtxt: {
        padding: 10,
        fontSize: 18,
    },
    bottom: {
        backgroundColor: "#fff",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 18,
        backgroundColor: "#f0f2f5",
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: "#4267B2",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    receiveButton: {
        backgroundColor: "#E4E6EB",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    receiveButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    profContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ddd",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    status: {
        fontSize: 14,
        color: "#999",
    },
    msgtime: {
        fontSize: 12,
        color: "#000000",
        marginTop: 5,
        alignSelf: "flex-end",
    },
});

export default ChatPage;
