import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    TouchableOpacity,
} from "react-native";
import { fetchUserChats } from "../api/chatApi";
import { formateDate } from "../utils";
import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";

const ColoredBar = ({ color }) => (
    <View style={[styles.coloredBar, { backgroundColor: color }]} />
  );
  
const ColorButton = ({ title, color, isSelected, onPress }) => {
    const titleStyle = isSelected ? styles.titleSelected : styles.titleUnselected;

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "transparent" }]}
        onPress={onPress}
      >
        <Text style={[titleStyle, { color: "black" }]}>{title}</Text>
        {isSelected && <ColoredBar color={color} />}
      </TouchableOpacity>
    );
};

const Chat = ({
    id,
    recipientUsername,
    recipientId,
    online,
    lastMessage,
    time,
    imgUri,
    navigation,
}) => {
    const MessageLen = 25;

    function OpenChat(id, recipientId) {
        navigation.navigate("ChatPage", {
            chatId: id,
            recipientId: recipientId,
        });
    }

    const timeArr = time.split(":");
    const timeArr2 = timeArr[2].split(".")[0];
    const formattedTime = `${timeArr[0]}:${timeArr[1]}:${timeArr2}`;

    return (
        <TouchableOpacity
            style={styles.chat}
            onPress={() => OpenChat(id, recipientId)}
        >
            <Image style={styles.profileImage} source={{ uri: imgUri }} />
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.recipientUsername}>
                        {recipientUsername}
                    </Text>
                    {online && <View style={styles.onlineIndicator} />}
                    <Text style={styles.time}>{formattedTime}</Text>
                </View>
                <Text style={styles.lastMessage}>
                    {lastMessage.length > MessageLen
                        ? `${lastMessage.slice(0, MessageLen)}...`
                        : lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const ChatList = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [showScrollView, setShowScrollView] = useState(true);

    const loadChats = async () => {
        try {
            const data = await fetchUserChats();
            setChats(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadChats();
    }, []);

    const [selectedButton, setSelectedButton] = useState(1);

    const onPressButton1 = () => {
      setSelectedButton(1);
      setShowScrollView(true);
    };
  
    const onPressButton2 = () => {
      setSelectedButton(2);
      setShowScrollView(false);
    };

    return (
        <View style={[styles.container, styles.text]}>
            <View style={styles.buttonContainer}>
            <ColorButton
                title="Личные"
                color="#d2a8f6"
                isSelected={selectedButton === 1}
                onPress={onPressButton1}
            />
            <ColorButton
                title="Групповые"
                color="#d2a8f6"
                isSelected={selectedButton === 2}
                onPress={onPressButton2}
            />
            {/* <Button
                    title="Личные"
                    
                    style = {[styles.button]}
                    onPress={() => {
                        setShowScrollView(true); // Show ScrollView on button 1 click
                    }}
                />
                <Button
                    title="Встречи"
                    style={[styles.button]}
                    onPress={() => {
                        setShowScrollView(false); // Hide ScrollView and show text "SOON" on button 2 click
                    }}
                /> */}
            </View>
              
            {showScrollView ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {chats.map((chat) => (
                        <Chat
                            key={chat.chatId}
                            id={chat.chatId}
                            recipientUsername={chat.recipientUsername}
                            recipientId={chat.recipientId}
                            online={chat.online}
                            lastMessage={chat.lastMessage.text}
                            time={chat.lastMessage.sendAtTime}
                            imgUri={
                                "https://sun9-22.userapi.com/impf/c855028/v855028839/cf38b/TOQ5sQ175mw.jpg?size=1620x2160&quality=96&sign=237f0e326daf7805f5f37b3417730b5d&type=album"
                            }
                            navigation={navigation}
                        />
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.text}>SOON</Text> // Display "SOON" when button 2 is clicked
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: FontFamily.montserratRegular,
    },
    chat: {
        flexDirection: "row",
        alignItems: "center",
        height: 70,
        marginBottom: 5,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 2,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatContent: {
        flex: 1,
        marginLeft: 10,
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    time: {
        color: "#A1A1A1",
        fontSize: 12,
    },
    lastMessage: {
        color: "#A1A1A1",
        fontSize: 14,
        marginTop: 5,
    },
    onlineIndicator: {
        backgroundColor: "#4CAF50",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,

    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 0,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
      },
    titleSelected: {
        fontFamily: FontFamily.montserratBold,
        fontSize: 18,
    },
    titleUnselected: {
        fontFamily: FontFamily.montserratRegular,
        fontSize: 18,
    },
    coloredBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        borderRadius: 4,
    },
});

export default ChatList;
