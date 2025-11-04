import React, { useState } from "react";
import { View, StyleSheet, useColorScheme, TextInput} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Colors } from "../../constants/theme";
import Header from "@/components/header";

const Map = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Header />

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].border,
            },
          ]}
          onChangeText={setSearch}
          value={search}
          placeholder="Pesquisar por nome"
          placeholderTextColor={Colors[colorScheme].text}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  
  input: {
    width: "80%",
    height: 50,
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 15,
  }
})

export default Map;