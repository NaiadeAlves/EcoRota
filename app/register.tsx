import React, { useState } from "react";
import { Text, View, Button, Image, StyleSheet, useColorScheme, TextInput, KeyboardAvoidingView, ScrollView, Pressable} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Colors } from "../constants/theme";
import Header from "../components/header"
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


const Register = () => {
    const colorScheme = useColorScheme() as "light" | "dark";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        //ajusta a altura com base no teclado virtual
        <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
        >
        
        {/*impede que o conteúdo da tela suba ao ser clicado*/}
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <Header/>

        <View style={styles.content}>
            {/*botão de voltar e título da tela*/}
            <View style = {styles.titleContainer}>
                <Pressable style={[
                    styles.backButton,
                    { borderColor: Colors[colorScheme].border, backgroundColor: Colors[colorScheme].border, }
                ]} 
                //volta para login
                onPress={() => router.push("/login")}>
                    <Ionicons 
                        name="arrow-back" 
                        size={28} 
                        color={Colors[colorScheme].icon} 
                    />
                </Pressable>
                <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Cadastro</Text>
            </View>

                <SafeAreaView style = {styles.inputContainer }>
                    <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border,}]}
                    onChangeText={setName}
                    value={name}
                    placeholder="Digite seu usuário"
                    placeholderTextColor={Colors[colorScheme].text}
                    />
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
                    <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border,}]}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirme sua senha"
                    placeholderTextColor={Colors[colorScheme].text}
                    secureTextEntry = {true}
                    />
                </SafeAreaView>

            {/*botão que cadastra o usuário*/}
            <View style = {styles.button}>
             <Button
                title = "Cadastrar"
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
        </ScrollView>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    width: "100%",
  },
  backButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    position: "absolute",
    left: 40,
  },
  button: {
    marginTop: 15,
  },
  photo: {
    width: 383,
    height: 329,
    alignSelf: "center"
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