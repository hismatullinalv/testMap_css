import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    SafeAreaView,
    Modal,
    Linking,
    TouchableHighlight,
    Image,
    TouchableOpacity,
} from "react-native";
import { gStyle } from "../../styles/style";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import ModalContainer from "../elements/ModalContainer";
import LoginScreen from "./LoginScreen";
import ChatList from "./ChatList";
import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";
const cafeCoordinates = {
    latitude: 53.223048,
    longitude: 50.191453,
};

const customMapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#bdbdbd",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#181818",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1b1b1b",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#2c2c2c",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#8a8a8a",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#373737",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#3c3c3c",
            },
        ],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#4e4e4e",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#3d3d3d",
            },
        ],
    },
];

export function Map({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupId, setPopupId] = useState(0);

    function openSettings() {
        Linking.openSettings();
    }

    async function checkPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
            setPermissionGranted(true);
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setModalVisible(false);
        } else {
            setErrorMsg("Permission to access location was denied");
            setModalVisible(true);
        }
    }

    useEffect(() => {
        checkPermission();
    }, []);

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    }

    const FriendListPage = () => {
        navigation.navigate("FriendList");
    };

    const openPopup = (id) => {
        setPopupId(id);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const renderPopup = ({ id }) => {
        return (
            <ModalContainer
                visible={isPopupVisible}
                onCloseRequest={closePopup}
            >
                {id === 0 ? <ChatList /> : <LoginScreen />}
            </ModalContainer>
        );
    };

    return (
        <View>
             <View 
                style={[styles.menuButtonContainer, styles.container]}
                backgroundColor = "transparent"
                >
                    <TouchableHighlight
                        onPress={() => navigation.navigate('SettingsPage')}
                        underlayColor="transparent"
                    >
                        <View 
                            style={styles.button}
                            width = {40}
                            height = {40}
                            >
                            <Feather name="menu" size={25} style={styles.icon} />
                        </View>
                    </TouchableHighlight>
                    <View style={styles.findInputField}>
                        <TextInput style={[styles.findInput]}  
                                label="поиск"
                                // onChangeText={setEmail}
                                // keyboardType="email-address" 
                                />
                    </View>
            </View>
            
            {permissionGranted && location && (
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    customMapStyle={customMapStyle}
                >
                    <Marker
                        coordinate={cafeCoordinates}
                        title={"title"}
                        description={"description"}
                        onPress={() => {
                            console.log(cafeCoordinates);
                            openPopup(cafeCoordinates);
                        }}
                    />
                </MapView>
            )}
            {!isPopupVisible && (
                <View style={styles.container}>
                    
                    <View style={styles.buttonsContainer}>
                        <TouchableHighlight
                            onPress={() => navigation.navigate('FriendList')}
                            underlayColor="transparent"
                        >
                            <View style={styles.button}>
                            <Feather name="users" size={30} style={styles.icon} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => navigation.navigate('ChatList')}
                            underlayColor="transparent"
                        >
                            <View style={styles.button}>
                            <Feather name="mail" size={30} style={styles.icon} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => navigation.navigate('PersonalPageExample')}
                            underlayColor="transparent"
                        >
                            <View style={styles.button}>
                            <Feather name="user-plus" size={30} style={styles.icon} />
                            </View>
                        </TouchableHighlight>
                    </View>
                   
              </View>
            )}
            {renderPopup({ id: popupId })}
            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        This app needs access to your location to function
                        properly. Please go to your device settings to grant
                        access.
                    </Text>
                    <Button title="Go to Settings" onPress={openSettings} />
                    <Button
                        title="Check Permission"
                        onPress={checkPermission}
                    />
                </View>
            </Modal>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
      },
      map: {
        width: "100%",
        height: "100%",
      },
     button: {
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: Padding.p_3xs,
        shadowOpacity: 2,
        elevation: 4,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowColor: "#d2a8f6",
        borderRadius: Border.br_mini,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 10,
        margin: 10,
        borderWidth: 0,
        outline: "none",
    },
      icon: {
        color: "#d2a8f6",
      },
      buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        width: "100%",
      },
      menuButtonContainer: {
        flexDirection: "row",
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        zIndex: 1,
      },
      findInput: {
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
     
      findInputField: {
        // marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "white",
        height: 40,
        width: 250,
        margin: 10,
        // paddingLeft: 10,
        // paddingTop: 2,
        // paddingRight: 2,
        // paddingBottom: 2,
        //alignSelf: "stretch",
      },
    // map: {
    //     height: "100%",
    //     weight: "100%",
    //     position: 'relative',
    // },
    // modalContainer: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // modalText: {
    //     textAlign: "center",
    //     marginBottom: 20,
    // },
    // button: {
    //     backgroundColor: Color.gray_300,
    //     flexDirection: "row",
    //     padding: Padding.p_3xs,
    //     shadowOpacity: 1,
    //     elevation: 4,
    //     shadowRadius: 4,
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowColor: "#AF57FA",
    //     borderRadius: Border.br_mini,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: 50,
    //     height: 50,
    //     borderRadius: 10,
    //     margin: 10,
    //     borderWidth: 0,
    //     outline: "none",
    // },
    // icon: {
    //     borderWidth: 0,
    //     outline: "none",
    // },
    // container: {
    //    flex: 1,
    //     // justifyContent: 'center',
    //     // alignItems: 'center',
    //     position: 'absolute',
        
    //   },
    //   buttonsContainer: {
    //     position: 'absolute',
    //     bottom: 20,
    //     flexDirection: 'row',
    //     // alignItems: 'center',
    //     // justifyContent: 'center',
    //   },
    //   button: {
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     padding: 10,
    //     margin: 10,
    //     zIndex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: 50,
    //     height: 50,
    //   },
    //   icon: {
    //     color: '#d2a8f6',
    //   },
    //   menuButtonContainer: {
    //     position: 'absolute',
    //     top: 20,
    //     left: 20,
    //   },
});

export default Map;
