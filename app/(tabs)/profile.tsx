import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Colors } from "../../constants/theme";
import Header from "../../components/header";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from "../contexts/UserContext";


const screenWidth = Dimensions.get("window").width;

const Profile: React.FC = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  
  // ⬅️ ATUALIZADO: Inicializa os estados com valores vazios/padrão
  const [userData, setUserData] = useState({
    name: "Carregando...",
    email: "carregando@exemplo.com",
  });
const { user, setUser } = useUser();

  // 🔑 NOVO: Hook para carregar os dados do usuário ao montar o componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Busca o nome e o email que foram salvos no Login.js
        const storedName = await AsyncStorage.getItem('userName');
        const storedEmail = await AsyncStorage.getItem('userEmail');

        // Atualiza o estado se os dados forem encontrados
        setUserData({
          name: storedName || "Nome Não Encontrado", 
          email: storedEmail || "Email Não Encontrado",
        });
        
        // Log para debug
        console.log("Perfil: Dados do usuário carregados:", { 
            name: storedName, 
            email: storedEmail 
        });

      } catch (e) {
        console.error("Erro ao carregar dados do usuário no perfil:", e);
        setUserData({ 
            name: "Erro ao Carregar", 
            email: "erro@carregar.com" 
        });
      }
    };

    loadUserData();
  }, []); // Executa apenas uma vez ao montar

  const recycleData = [
    {
      name: "Papel",
      population: 40,
      color: "#42A5F5",
      legendFontColor: Colors[colorScheme].text,
      legendFontSize: 14,
    },
    {
      name: "Plástico",
      population: 25,
      color: "#C41A1A",
      legendFontColor: Colors[colorScheme].text,
      legendFontSize: 14,
    },
    {
      name: "Vidro",
      population: 20,
      color: "#2D6F3F",
      legendFontColor: Colors[colorScheme].text,
      legendFontSize: 14,
    },
    {
      name: "Metal",
      population: 15,
      color: "#E4BC19",
      legendFontColor: Colors[colorScheme].text,
      legendFontSize: 14,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
    >
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Header />
        {/* Foto de perfil */}
        <View style={{ alignItems: "center", width: "100%" }}>
        <Image
          source={
            user.profilePhoto
              ? { uri: user.profilePhoto }
              : require("../../assets/images/profile-test.jpg")
          }
          style={[
            styles.profile,
            { borderColor: Colors[colorScheme].border }
          ]}
        />

        {/* Nome e email */}
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Perfil</Text>

        <View style={[styles.infoBox, { backgroundColor: Colors[colorScheme].backgroundCard }]}>
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Usuário</Text>
          <Text
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              },
            ]}
          >
            {userData.name}
          </Text>

          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Email</Text>
          <Text
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              },
            ]}
          >
            {userData.email}
          </Text>

         
            <Pressable
              style={[
                styles.editButton,
                { backgroundColor: Colors[colorScheme].button },
              ]}
              onPress={() => router.push("/edit-profile")}
            >
              <Text style={styles.editText}>Editar Perfil</Text>
            </Pressable>
          
          
          <Pressable
          style={[
            styles.logoutButton,
            {
              backgroundColor: colorScheme === "dark" ? "#570202ff" : "#700505ff",
            },
          ]}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("userToken");
              await AsyncStorage.removeItem("userName");
              await AsyncStorage.removeItem("userEmail");
              
              // 🔹 Limpa o contexto do usuário
              setUser({
                id: null,
                name: null,
                email: null,
                profilePhoto: null
              });

              console.log("Logout realizado com sucesso.");
              router.replace("/login");
            } catch (e) {
              console.error("Erro ao fazer logout:", e);
            }
          }}

        >
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>

          
        </View>

        {/* Relatório */}
        <View style={styles.reportContainer}>
          <Text style={[styles.subtitle, { color: Colors[colorScheme].text }]}>
            Relatório de Reciclagem
          </Text>
          {/*
          <Text style={[styles.description, { color: Colors[colorScheme].text }]}>
            Veja a porcentagem de materiais reciclados até agora:
          </Text>
          */}
          
          <View style={[styles.RelatorioBox, { backgroundColor: Colors[colorScheme].backgroundCard }]}>
          
          <PieChart
            data={recycleData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: "transparent",
              backgroundGradientFrom: Colors[colorScheme].background,
              backgroundGradientTo: Colors[colorScheme].background,
              color: () => Colors[colorScheme].text,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[0, 10]}
            absolute
          />
          
          
          <View style={styles.summary}>
            <Text style={[styles.total, { color: Colors[colorScheme].text }]}>
              Total reciclado: <Text style={{ fontWeight: "bold" }}>82 itens</Text>
            </Text>
            </View>
          </View>
          <Text style={[styles.motivation, { color: Colors[colorScheme].text }]}>
              🌎 Continue contribuindo para um planeta mais limpo!
            </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderRadius: 60,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 15,
     
  },
  infoBox: {
   width: "90%",
  borderRadius: 12,
  padding: 20,
  marginTop: 15,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  elevation: 4,
  },

  RelatorioBox: {
    width: "100%",
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
    editButton: {
    width: "100%",
    alignItems: "center",
    padding: 5,
    marginTop: 3,
    borderRadius: 10,
    overflow: "hidden",
  },

  logoutButton: {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 5,
  marginTop: 10,
  borderRadius: 10,
},
logoutText: {
  color: "#fff",
  fontSize: 18,
},


  editText: {
    color: "#fff",
    fontSize: 18,
  },
  reportContainer: {
    marginTop: 30,
    alignItems: "center",
    width: "90%",
    
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    opacity: 0.8,
  },
  summary: {
    alignItems: "center",
    marginTop: 15,
  },
  total: {
    fontSize: 18,
    marginBottom: 5,
  },
  motivation: {
    marginTop: 10,
    fontSize: 15,
    opacity: 0.8,
  },

});

export default Profile;
