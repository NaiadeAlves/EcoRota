import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  useColorScheme,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Colors } from "../constants/theme";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";

const EditProfile = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      {/*impede que o conteúdo da tela suba ao ser clicado*/}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header />
        {/*botão de voltar e título da tela*/}
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Pressable
              style={[
                styles.backButton,
                {
                  borderColor: Colors[colorScheme].border,
                  backgroundColor: Colors[colorScheme].border,
                },
              ]}
              //volta para Perfil
              onPress={() => router.push("/(tabs)/profile")}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color={Colors[colorScheme].icon}
              />
            </Pressable>
            <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
              Editar Perfil
            </Text>
          </View>
          {/*imagem de perfil*/}
          <Image
            source={require("../assets/images/profile-test.png")}
            style={[
              styles.profile,
              { borderColor: Colors[colorScheme].border },
            ]}
            resizeMode="contain"
          />

          <SafeAreaView style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setName}
              value={name}
              placeholder="Maria"
              placeholderTextColor={Colors[colorScheme].text}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setEmail}
              value={email}
              placeholder="maria123@gmail.com"
              placeholderTextColor={Colors[colorScheme].text}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setPassword}
              value={password}
              placeholder="Digite sua senha"
              placeholderTextColor={Colors[colorScheme].text}
              secureTextEntry={true}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirme sua senha"
              placeholderTextColor={Colors[colorScheme].text}
              secureTextEntry={true}
            />
          </SafeAreaView>

          <View style={styles.pContain}></View>

          {/*botão que redireciona para a tela principal*/}
          <View style={styles.button}>
            <Button
              title="Salvar"
              onPress={() => {
                router.push("/(tabs)");
              }}
              color={Colors[colorScheme].button}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  profile: {
    marginTop: 30,
    marginBottom: 30,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50,
  },
  button: {
    marginTop: 15,
  },
  pContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    position: "absolute",
    left: 40,
    
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    width: "100%",
  },
});

export default EditProfile;
