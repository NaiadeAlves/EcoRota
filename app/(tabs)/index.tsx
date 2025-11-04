import React, {useState} from 'react';
import { View, Text, StyleSheet, useColorScheme, Image, Pressable,ScrollView } from 'react-native';
import Header from "../../components/header";
import { Colors } from '../../constants/theme'; 
import RecyclableCard from "../../components/recycle-card";

const Home = () => {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].background }}>
      <Header />

      <View style = {styles.containerWelcome}>
          <Text style = {[styles.message, {color: Colors[colorScheme].text}]}>Bem vinda, Maria</Text>
          <Image
              source = { require ('../../assets/images/profile-test.png')}
              style = {[styles.profile, {borderColor: Colors[colorScheme].border,}]}
              resizeMode = "contain"
           />
      </View>
          
      <View style = {styles.sectionHeader}>
            <Text style = {[styles.message, {color: Colors[colorScheme].text}]}>♻️ Materiais Recicláveis</Text>
            
            <RecyclableCard
              title="Papel"
              description="Jornais, revistas, caixas, folhas de caderno."
              colorScheme={colorScheme}
              image = {require ("../../assets/images/papel.png")}
              backgroundColor="#3693dfff"
            />

            <RecyclableCard
              title="Plástico"
              description="Jornais, revistas, caixas, folhas de caderno."
              colorScheme={colorScheme}
              image = {require ("../../assets/images/plastico.png")}
              backgroundColor="#c41a1aff"
            />

            <RecyclableCard
              title="Vidro"
              description="Jornais, revistas, caixas, folhas de caderno."
              colorScheme={colorScheme}
              image = {require ("../../assets/images/vidro.png")}
              backgroundColor="#2D6F3F"
            />

            <RecyclableCard
              title="Vidro"
              description="Jornais, revistas, caixas, folhas de caderno."
              colorScheme={colorScheme}
              image = {require ("../../assets/images/papel.png")}
              backgroundColor="#e4bc19ff"
            />

            <RecyclableCard
              title="Móveis"
              description="Jornais, revistas, caixas, folhas de caderno."
              colorScheme={colorScheme}
              image = {require ("../../assets/images/moveis.png")}
              backgroundColor="#8C8C8C"
            />
      </View>
      
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  containerWelcome: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 30,
  },
  message: {
    fontSize: 22,
    fontWeight: "600",
    marginRight: 12,
  },

  profile: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
  },

 sectionHeader: {
  alignItems: "center",
  gap: 5,
  marginTop: 15,
  marginBottom: 15,
},
});

export default Home;

