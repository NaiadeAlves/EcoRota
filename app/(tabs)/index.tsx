import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Header from "../../components/header";
import { Colors } from '../../constants/theme'; 

const Home = () => {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <View>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
});

export default Home;

