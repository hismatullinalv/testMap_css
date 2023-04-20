import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, Image, Dimensions} from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles.js";
import { gStyle } from "../../styles/style";
import { Button, Card, TextInput } from "react-native-paper";
import { authenticateHandle } from "../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState(""); // 👈
    const [password, setPassword] = useState(""); // 👈

    const login = async () => {
        await authenticateHandle(email, password);
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken !== null) {
            navigation.navigate("Map");
        }
    };

    return (
        <LinearGradient
        style={styles.login}
        locations={[0, 1]}
        colors={["#d2a8f6", "#fff"]}
        >
        <View style={[styles.parent, styles.iconPosition]}>
            <Text style={styles.text}>Привет!</Text>
            <Text style={[styles.text1, styles.textTypo]}>
            Войдите, чтобы продолжить
            </Text>

            <View style={[styles.eMailWrapper, styles.email_1]}>
            <TextInput style={[styles.eMail]}  
                       label="e-mail"
                       onChangeText={setEmail}
                       keyboardType="email-address" />
            </View>

            <View style={styles.eMailWrapper}>
            <TextInput style={styles.eMail}  
                       label="пароль"
                       onChangeText={setPassword}
                       secureTextEntry={true} />
            </View>

         
            <Pressable
            style={[styles.container, styles.containerFlexBox]}
            onPress={login}
            >
            <Text style={[styles.text3, styles.textTypo]}>Войти</Text>
            </Pressable>
            <Pressable
            style={styles.pressable}
            onPress={() => navigation.navigate("Registration")}
            >
            <Text style={styles.text4}>
                <Text style={styles.text5}>{`Еще нет аккаунта? `}</Text>
                <Text style={styles.text6}>Зарегистрируйтесь</Text>
            </Text>
            </Pressable>
        </View>
        </LinearGradient>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    iconPosition: {
      //width: windowWidth >= 450 ? 400 : '80%',
      //height: windowHeight >= 800 ? 450 : '80%',
      width:   400,
      height:  450,
      
    },
    textTypo: {
      fontFamily: FontFamily.montserratMedium,
      fontWeight: "500",
      fontSize: FontSize.size_5xl,
      textAlign: "left",
      letterSpacing: 0,
    },
    containerFlexBox: {
      flexDirection: "row",
      marginTop: 33,
    },
    leftSideLayout: {
      height: 21,
      width: 54,
      left: "50%",
      position: "absolute",
    },
    text: {
      fontSize: FontSize.size_21xl,
      fontWeight: "800",
      fontFamily: FontFamily.montserratExtrabold,
      textAlign: "left",
      letterSpacing: 0,
      color: Color.labelColorLightPrimary,
      alignSelf: "stretch",
    },
    text1: {
      marginTop: 20,
      color: Color.labelColorLightPrimary,
      alignSelf: "stretch",
    },
    eMail: {
      color: Color.gray_500,
      fontFamily: FontFamily.montserratRegular,
      fontSize: FontSize.size_base,
      textAlign: "left", 
      //lineHeight: 22,
      letterSpacing: 0,
      borderBottomWidth: 0,
      borderColor: 'transparent',
      borderWidth: 0,
      backgroundColor: 'transparent',
      underlineColorAndroid: 'transparent',
    },
    email_1:{
      marginTop: 20,
    },
    eMailWrapper: {
      marginTop: 10,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: Color.gray_200,
      paddingLeft: 10,
      paddingTop: 2,
      paddingRight: 2,
      paddingBottom: 2,
      alignSelf: "stretch",
    },
    text3: {
      color: Color.white,
    },
    container: {
      backgroundColor: Color.plum_100,
      padding: Padding.p_mini,
      borderRadius: Border.br_xl,
    },
    text5: {
      fontWeight: "300",
      fontFamily: FontFamily.montserratLight,
      color: Color.labelColorLightPrimary,
    },
    text6: {
      fontWeight: "700",
      fontFamily: FontFamily.montserratBold,
      color: Color.plum_100,
    },
    text4: {
      fontSize: FontSize.size_base,
      textAlign: "left",
      lineHeight: 22,
      letterSpacing: 0,
    },
    pressable: {
      marginTop: 33,
    },
    parent: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Color.white,
      shadowColor: "#d2a8f6",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 20,
      elevation: 20,
      shadowOpacity: 1,
      padding: Padding.p_11xl,
      borderRadius: Border.br_xl,
    },
    notchIcon: {
      marginLeft: -82,
      width: 164,
      height: 32,
      top: 0,
    },
    text7: {
      top: 1,
      left: 0,
      fontSize: FontSize.size_mid,
      color: Color.gray_100,
      textAlign: "center",
      height: 20,
      width: 54,
      fontFamily: FontFamily.montserratRegular,
      lineHeight: 22,
      letterSpacing: 0,
      position: "absolute",
    },

   
    login: {
      flex: 1,
      height: "100%",
      width: "100%",
      justifyContent: "center",
      //justifyContent: "space-between",
      backgroundColor: "transparent",
      alignItems: "center",
    },
  });

export default LoginScreen;
