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
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import { ActivityIndicator } from "react-native";

//const BACKEND_URL = "http://192.168.3.61:5000";
const BACKEND_URL = "https://ecorota-2.onrender.com";

const Register = () => {
  const colorScheme = useColorScheme() as "light" | "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
   const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    //confirma o nome que será enviado
    console.log("Tentando cadastrar usuário. Nome enviado:", name);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/register`, {
        name,
        email,
        password,
      });

      console.log("Usuário cadastrado com sucesso! Retorno:", res.data);
      router.push("/login"); // volta para a tela de login
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Erro desconhecido ao cadastrar.";
      console.error("Erro ao cadastrar:", message);
      setErrorMessage(message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Header />
      {/* Loading */}
            {loading && (
              <ActivityIndicator
                size="large"
                color={Colors[colorScheme].button}
                style={{ marginBottom: 10 }}
              />
            )}
      <View style={styles.content}>
        {/*botão de voltar e título da tela*/}
        <View style={styles.titleContainer}>
          <Pressable
            style={[
              styles.backButton,
              {
                borderColor: Colors[colorScheme].border,
                backgroundColor: Colors[colorScheme].border,
              },
            ]}
            //volta para login
            onPress={() => router.push("/login")}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={Colors[colorScheme].icon}
            />
          </Pressable>
          <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
            Cadastro
          </Text>
        </View>

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
            placeholder="Digite seu usuário"
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
            placeholder="Digite seu email"
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

        {/*botão que cadastra o usuário*/}
        <View style={styles.button}>
          <Button
            title="Cadastrar"
            color={Colors[colorScheme].button}
            onPress={handleRegister}
          />
        </View>
        <Image
          source={require("../assets/images/arte-principal2.png")}
          style={styles.photo}
          resizeMode="contain"
        />
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
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
    marginTop: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    flex: 1,
  },
  button: {
    marginTop: 15,
  },
  photo: {
    width: 383,
    height: 300,
    alignSelf: "center",
    marginTop: -20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
});

export default Register;
