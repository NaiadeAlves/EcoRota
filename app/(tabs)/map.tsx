import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  useColorScheme,
  StyleSheet,
  Alert,
  Keyboard,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import MapView, { Marker, Region } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import { Colors } from "../../constants/theme";
import EvilIcons from '@expo/vector-icons/EvilIcons';

//posição padrão para Teresina
const DEFAULT_REGION: Region = {
  latitude: -5.0935,
  longitude: -42.8037,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function Map() {
  const scheme = useColorScheme() ?? "light";
  const params = useLocalSearchParams();
  const { latitude, longitude, title, zoom } = params;

  const [search, setSearch] = useState("");
  const [currentRegion, setCurrentRegion] = useState(DEFAULT_REGION);
  const [searchedLocation, setSearchedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null); // Função para solicitar permissão e obter a localização atual do usuário

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão de Localização Negada",
        "Para exibir sua localização, por favor, habilite a permissão nas configurações."
      );
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setCurrentRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
      setSearchedLocation(null);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível obter a localização atual. Exibindo posição padrão."
      );
      setCurrentRegion(DEFAULT_REGION);
    }
  };
  useEffect(() => {
    if (latitude && longitude) {
      // Converte as strings recebidas de volta para número
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const zoomLevel = parseFloat(zoom as string) || 0.015; // Centraliza o mapa no ponto de reciclagem

      setCurrentRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: zoomLevel,
        longitudeDelta: zoomLevel,
      }); // Adiciona o marcador no local exato
      setSearchedLocation({ latitude: lat, longitude: lng }); // Atualiza a barra de busca com o nome do ponto
      setSearch((title as string) || "");
    } else {
      getLocation();
    }
  }, [latitude, longitude, title, zoom]);

  const searchLocation = async () => {
    Keyboard.dismiss();

    if (!search.trim()) {
      Alert.alert(
        "Aviso",
        "Digite um endereço ou nome de local para pesquisar."
      );
      return;
    }

    try {
      let results = await Location.geocodeAsync(search.trim());

      if (results.length > 0) {
        const firstResult = results[0];
        setCurrentRegion({
          latitude: firstResult.latitude,
          longitude: firstResult.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        setSearchedLocation({
          latitude: firstResult.latitude,
          longitude: firstResult.longitude,
        });
      } else {
        setSearchedLocation(null);
        Alert.alert(
          "Local não encontrado",
          `Não foi possível encontrar coordenadas para "${search}". Tente ser mais específico.`
        );
      }
    } catch (error) {
      console.error("Erro na pesquisa de localização:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao buscar o local. Verifique sua conexão."
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[scheme].background }]}
    >
      <Header />
      <View style={styles.searchContainer}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar por endereço ou nome"
        placeholderTextColor={Colors[scheme].text}
        style={[
          styles.input,
          { color: Colors[scheme].text, borderColor: Colors[scheme].border },
        ]}
        onSubmitEditing={searchLocation}
        returnKeyType="search"
      />
      <Pressable
          onPress={searchLocation}
          style={styles.searchIcon}
        ><EvilIcons name="search" size={24} color={Colors[scheme].text}/>
      </Pressable>
      </View>
      <MapView
        style={styles.map}
        region={currentRegion}
        onRegionChangeComplete={setCurrentRegion}
        showsUserLocation={true}
      >
        {searchedLocation && (
          <Marker
            coordinate={searchedLocation}
            title={search || "Ponto de Coleta"}
            description="Local de reciclagem ou ponto pesquisado."
            pinColor={latitude ? "green" : "red"}
          />
        )}

      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  input: {
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    paddingRight: 40,
  },
  map: {
    flex: 1,
  },
});
