import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  StatusBar,
} from "react-native";
import Header from "../../components/header";
import RecyclableCard from "../../components/recycle-card";
import { Colors } from "../../constants/theme";
import { useUser } from "../../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

//coordenadas dos pontos de reciclagem
const MATERIAL_POINTS = {
  Papel: {
    latitude: -5.0767826,
    longitude: -42.8258053,
    title: "JM Recicladora",
    zoom: 0.015,
  },
  Plástico: {
    latitude: -5.0767826,
    longitude: -42.8258053,
    title: "JM Recicladora",
    zoom: 0.015,
  },
  Vidro: {
    latitude: -5.071137,
    longitude: -42.794753,
    title: "SOS Mini Entulhos - Coleta de Resíduos e Entulhos em Teresina",
    zoom: 0.02,
  },
  Metal: {
    latitude: -5.1113497,
    longitude: -42.8029669,
    title: "Teresina Reciclagem - Compra de Sucata de Aluminio",
    zoom: 0.015,
  },
  Móveis: {
    latitude: -5.071137,
    longitude: -42.794753,
    title: "SOS Mini Entulhos - Coleta de Resíduos e Entulhos em Teresina",
    zoom: 0.02,
  },
};

const Home = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() as "light" | "dark";
  const [userName, setUserName] = useState("Usuário");
  const { user } = useUser();

  
  //redirecionamento
  const handleNavigateToMap = (material: keyof typeof MATERIAL_POINTS) => {
    const pointData = MATERIAL_POINTS[material];
    if (pointData) {
      router.push({
        pathname: "/map",
        params: {
          latitude: pointData.latitude.toString(),
          longitude: pointData.longitude.toString(),
          title: pointData.title,
          zoom: pointData.zoom.toString(),
        },
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadUserName = async () => {
        try {
          const storedName = await AsyncStorage.getItem("userName");
          if (storedName) {
            const firstName = storedName.trim().split(" ")[0];
            setUserName(firstName);
          }
        } catch (e) {
          console.error("Erro ao carregar nome do usuário:", e);
        }
      };

      setTimeout(() => {
        loadUserName();
      }, 200);
    }, [])
  );

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: Colors[colorScheme].background }]}>
      <Header />
    <ScrollView style={{ backgroundColor: Colors[colorScheme].background }}>
     
      <View
        style={[
          styles.containerWelcome,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <View>
          <Text
            style={[styles.welcomeText, { color: Colors[colorScheme].text }]}
          >
            👋 Bem-vindo(a),
          </Text>
          <Text style={[styles.userName, { color: Colors[colorScheme].text }]}>
            {user?.name ? user.name.split(" ")[0] : "Usuário"}
          </Text>
        </View>
        <Image
          source={
            user.profilePhoto
              ? { uri: user.profilePhoto }
              : require("../../assets/images/profile-test.jpg")
          }
          style={[styles.profile, { borderColor: Colors[colorScheme].border }]}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.message, { color: Colors[colorScheme].text }]}>
          ♻️ Materiais Recicláveis
        </Text>

        <RecyclableCard
          title="Papel"
          description="Jornais, revistas, envelopes, rascunhos, papel sulfite, cartazes, listas telefônicas, papel de fax, folhas de caderno, fotocópias, formulários, caixas de papelão, cartolinas e aparas de papel."
          colorScheme={colorScheme}
          image={require("../../assets/images/papel.png")}
          backgroundColor="#3693dfff"
          onNavigate={() => handleNavigateToMap("Papel")}
        />

        <RecyclableCard
          title="Plástico"
          description="Embalagens de produtos de limpeza, tupperware, baldes, canos, tubos de pvc, frascos plásticos de produtos, sacos/sacolas, garrafas de refrigerantes e garrafas plásticas."
          colorScheme={colorScheme}
          image={require("../../assets/images/plastico.png")}
          backgroundColor="#c41a1aff"
          onNavigate={() => handleNavigateToMap("Plástico")}
        />

        <RecyclableCard
          title="Vidro"
          description="Copos, tampa de forno microondas, frascos de vidro, potes de vidro, cacos e garrafas de vidro."
          colorScheme={colorScheme}
          image={require("../../assets/images/vidro.png")}
          backgroundColor="#2D6F3F"
          onNavigate={() => handleNavigateToMap("Vidro")}
        />

        <RecyclableCard
          title="Metal"
          description="Latas, ferragens, canos, pregos, aerossóis, cobre, parafusos, embalagem, talheres de metal, enlatados e tampas de garrafa."
          colorScheme={colorScheme}
          image={require("../../assets/images/metal.png")}
          backgroundColor="#e4bc19ff"
          onNavigate={() => handleNavigateToMap("Metal")}
        />

        <RecyclableCard
          title="Móveis"
          description="Cadeiras, mesas, sofás e armários usados."
          colorScheme={colorScheme}
          image={require("../../assets/images/moveis.png")}
          backgroundColor="#8C8C8C"
          onNavigate={() => handleNavigateToMap("Móveis")}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
  },
  containerWelcome: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
  },
  message: {
    fontSize: 22,
    fontWeight: "600",
    marginRight: 12,
  },

  profile: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
  },

  sectionHeader: {
    alignItems: "center",
    gap: 5,
    marginTop: 15,
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: "500",
  },

  userName: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
  },
});

export default Home;
