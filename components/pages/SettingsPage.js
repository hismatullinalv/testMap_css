import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles.js";
import { HeaderBackButton } from '@react-navigation/stack';


const SettingsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Настройки</Text>
      <Text style={styles.sectionHeader} onPress={() => navigation.navigate('PersonalPageExample')}>Персональная информация</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  
  sectionHeader: {
    
    fontSize: FontSize.size_5xl,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: FontFamily.montserratMedium,
    textAlign: "left",
    color: Color.gray_100,
    letterSpacing: 0,
    alignSelf: "stretch",
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSize.size_21xl,
    fontWeight: "900",
    fontFamily: FontFamily.montserratBlack,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    letterSpacing: 0,
    alignSelf: "stretch",
    marginBottom: 30,
  },
 
});

export default SettingsPage;