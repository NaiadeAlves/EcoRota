import React, { useState } from "react";
import { Text, View, Button, Image, StyleSheet, useColorScheme, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import Checkbox from "expo-checkbox";
import { router } from 'expo-router';
import { Colors } from "../constants/theme";
import Header from "../components/header"

const Login = () => {
    const colorScheme = useColorScheme() as "light" | "dark";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    return (
        //ajusta a altura com base no teclado virtual
        <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
        >
        
        
        
        <Header/>

        <View style={styles.content}>
            <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Login</Text>

                <View style = {styles.inputContainer}>
                    <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border,}]}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Digite seu email"
                    placeholderTextColor={Colors[colorScheme].text}
                    />
                    <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border,}]}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Digite sua senha"
                    placeholderTextColor={Colors[colorScheme].text}
                    secureTextEntry = {true}
                    />
                </View>

            <View style = {styles.pContain}>
            <View style = {styles.checkboxContainer}>
                <Checkbox
                    value = {remember}
                    onValueChange={setRemember}
                    color={remember ? Colors[colorScheme].button : undefined}
                />
                <Text style={[{ color: Colors[colorScheme].text }]}>Lembre-se</Text>
            </View>
            <View>

                {/*redireciona para a tela de crecuperar senha*/}
                <Pressable onPress = {() => {
                    router.push('/register');
                }}>
                    <Text style={[ { color: Colors[colorScheme].text }]}>Esqueceu a senha?</Text>
                </Pressable>

                    {/*redireciona para a tela de cadastro*/}
                <Pressable onPress = {() => {
                    router.push('/register');
                }}>
                    <Text style={[{ color: Colors[colorScheme].text }]}>Criar Conta</Text>
                </Pressable>

            </View>
            </View>

            {/*botão que redireciona para a tela principal*/}
            <View style = {styles.button}>
             <Button
                title = "Entrar"
                onPress = {() => {
                    router.push('/(tabs)');
                }}
                color={Colors[colorScheme].button}
             />
             </View>
             
        </View>
            <Image
                source={
                require ('../assets/images/arte-principal2.png')}
                style = {styles.photo}
                resizeMode="contain"
            />
       
        </KeyboardAvoidingView>
    )
};

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
    alignSelf: "center"
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
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  }
});

export default Login;