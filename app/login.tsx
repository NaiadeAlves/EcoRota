import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import Header from "../components/header";
import { Colors } from "../constants/theme";
import { useUser } from "../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const colorScheme = useColorScheme() as "light" | "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const userEmail = email;
  const [error, setError] = useState("");
  //const BACKEND_URL = "http://192.168.3.61:5000";
  const BACKEND_URL = "https://impecunious-filterable-tennie.ngrok-free.dev";
  const { setUser } = useUser();

  const handleLogin = async () => {
    setError("");

    console.log("Tentando conectar ao backend:", BACKEND_URL);
    console.log("Email que será enviado:", email);

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Dados recebidos do login:", data);

      if (response.ok) {
        const token = data.token;
        const name = data.name;

        console.log("Nome do usuário capturado:", name);

        await AsyncStorage.setItem("userId", data.userId);
        await AsyncStorage.setItem("userName", name);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("userToken", data.token);

        const storedPhoto = await AsyncStorage.getItem(
          `profilePhoto_${data.userId}`
        );

        setUser({
          id: data.userId,
          name: data.name,
          email: email,
          profilePhoto: storedPhoto || data.profilePhoto || null,
        });

        console.log("Login bem-sucedido! Token:", token);
        router.push("/(tabs)"); // Navega para a página principal
      } else {
        //exibir mensagem de erro se o login falhar
        setError(data.message || "Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      //mensagem de erro de rede
      setError(
        "Não foi possível conectar ao servidor. Verifique a URL ou a rede."
      );
      console.error("Erro de conexão/fetch:", err);
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
      {/* Adiciona a mensagem de erro */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.content}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
          Login
        </Text>

        <View style={styles.inputContainer}>
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
        </View>

        <View style={styles.pContain}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={remember}
              onValueChange={setRemember}
              color={remember ? Colors[colorScheme].button : undefined}
            />
            <Text style={{ color: Colors[colorScheme].text }}>Lembre-se</Text>
          </View>

          <View>
            <Pressable onPress={() => router.push("/register")}>
              <Text style={{ color: Colors[colorScheme].text }}>
                Esqueceu a senha?
              </Text>
            </Pressable>

            <Pressable onPress={() => router.push("/register")}>
              <Text style={{ color: Colors[colorScheme].text }}>
                Criar Conta
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.button}>
          <Button
            title="Entrar"
            onPress={handleLogin}
            color={Colors[colorScheme].button}
          />
        </View>
      </View>

      <Image
        source={require("../assets/images/arte-principal2.png")}
        style={styles.photo}
        resizeMode="contain"
      />
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
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
  photo: {
    width: 383,
    height: 329,
    alignSelf: "center",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
