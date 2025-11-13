import React from "react";
import {View, Image, StyleSheet, useColorScheme } from "react-native";
import {Colors} from "../constants/theme"

const Header = () => {
    //verifica se o sistem está no modo claro ou escuro
    const colorScheme = useColorScheme() as "light" | "dark";
    return (
        //header, aplica cor na tela de fundo
        <View style = {[styles.container, {backgroundColor: Colors[colorScheme].tint}]}>
            {/*definindo a imagem da logo */}
            <Image
            source={
                require ('../assets/images/logo.png')}
                style = {styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

//estilização do header
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 10,
        alignItems: "center",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    logo: {
        width: 120,
        height: 120,
    },
});

export default Header;