import React, { useState } from "react";
import { Text, View, Button, Image, StyleSheet, useColorScheme, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from "../../constants/theme";
import Header from "../../components/header" 

const Profile = () => {
    const colorScheme = useColorScheme() as "light" | "dark";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
        >
        
        {/*impede que o conteúdo da tela suba ao ser clicado*/}
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <Header/>

        <View style={styles.content}>
            {/*imagem de perfil*/}
            <Image
                source = { require ('../../assets/images/profile-test.png')}
                style = {[styles.profile, {borderColor: Colors[colorScheme].border,}]}
                resizeMode = "contain"
            />

            <Text style={[styles.infos, { color: Colors[colorScheme].text }]}>Usuário</Text>
                <SafeAreaView style = {styles.inputContainer}>
                    <Text style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border,}]}>
                        Maria
                    </Text>
                </SafeAreaView>
            <Text style={[styles.infos, { color: Colors[colorScheme].text }]}>Email</Text>
                <SafeAreaView style = {styles.inputContainer}>
                    <Text style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border,}]}>
                        maria123@gmail.com
                    </Text>
                </SafeAreaView>

            <View style = {styles.pContain}>
            </View>

            {/*botão que redireciona para a tela principal*/}
            <View style = {styles.button}>
             <Button
                title = "Editar"
                onPress = {() => {
                    router.push('/edit-profile');
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
    justifyContent: "center",
    alignItems: "center",
  },
  infos: {
    justifyContent: "flex-start",
    fontSize: 24,
    marginBottom: 5,
  },
  profile: {
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
    fontSize: 20,
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

export default Profile;