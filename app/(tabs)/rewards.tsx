import React, { useState } from "react";
import { View, StyleSheet, useColorScheme, Text, ScrollView} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Colors } from "../../constants/theme";
import Header from "@/components/header";

const Reward = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  
  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].background }}>
        <View>
          <Header/>
        </View>

        <View style = {styles.containerMessage}>
          <Text style = {[styles.message, {color: Colors[colorScheme].text}]}>Resgatar Recompensas</Text>
        </View>
        <View  style={[styles.card, {borderColor: Colors[colorScheme].border2 }]}>
          <Text style = {[styles.PointsMessage, {color: Colors[colorScheme].text}]}>Meus pontos</Text>
          <Text style = {[styles.PointsMessage, {color: Colors[colorScheme].text}]}>0</Text>
        </View>
        <Text style = {[styles.PointsMessage, {color: Colors[colorScheme].text}]}>Converta seus pontos em saldo real.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  message: {
    fontSize: 22,
    fontWeight: "600",
  },

  containerMessage: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 380,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "#1d4327ff"
  },

  PointsMessage: {
    fontSize: 18,
    fontWeight: "600",
    
  },
})

export default Reward;
