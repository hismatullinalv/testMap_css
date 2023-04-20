import React from "react";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navigate } from "./navigate";
import { gStyle } from "./styles/style";

export default function App() {
    const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    Montserrat_light: require("./assets/fonts/Montserrat_light.ttf"),
    Montserrat_regular: require("./assets/fonts/Montserrat_regular.ttf"),
    Montserrat_medium: require("./assets/fonts/Montserrat_medium.ttf"),
    Montserrat_bold: require("./assets/fonts/Montserrat_bold.ttf"),
    Montserrat_extrabold: require("./assets/fonts/Montserrat_extrabold.ttf"),
    Montserrat_black: require("./assets/fonts/Montserrat_black.ttf"),
    Inter_light: require("./assets/fonts/Inter_light.ttf"),
    Inter_medium: require("./assets/fonts/Inter_medium.ttf"),
    Inter_bold: require("./assets/fonts/Inter_bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

    return (
        <SafeAreaView style={gStyle.safeAreaStyle}>
            <Navigate />
        </SafeAreaView>
    );
}
