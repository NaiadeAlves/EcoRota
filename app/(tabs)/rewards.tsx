import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Colors } from "../../constants/theme";
import Header from "@/components/header";
import * as ImagePicker from "expo-image-picker";

const Reward = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  const [points, setPoints] = useState(250);
  const [valueToConvert, setValueToConvert] = useState("");

  // Cada 100 pontos = R$1,00
  const conversionRate = 0.01;

  const handleTransfer = () => {
    const pointsToUse = parseInt(valueToConvert);
    if (!pointsToUse || pointsToUse <= 0) {
      Alert.alert("⚠️", "Informe uma quantidade válida de pontos para converter.");
      return;
    }
    if (pointsToUse > points) {
      Alert.alert("❌", "Você não tem pontos suficientes para essa conversão.");
      return;
    }

    const amount = pointsToUse * conversionRate;
    setPoints(points - pointsToUse);
    setValueToConvert("");
    Alert.alert(
      "💸 Transferência solicitada!",
      `Você converteu ${pointsToUse} pontos em R$${amount.toFixed(2)}.`
    );
  };

    // ------ ENVIAR RECICLAGEM ------
  const [photo, setPhoto] = useState<string | null>(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);


  // Tirar foto com a câmera
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("⚠️", "Permita o uso da câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Enviar dados
  const handleSendRecycling = () => {
    if (!photo || !itemName.trim() || !description.trim()) {
      Alert.alert("⚠️", "Preencha tudo e tire uma foto.");
      return;
    }

    Alert.alert(
      "Enviado! ♻️",
      `Item: ${itemName}\nLocal: ${location?.lat.toFixed(
        4
      )}, ${location?.lng.toFixed(4)}\nSua solicitação está em análise.`
    );

    // limpar
    setPhoto(null);
    setItemName("");
    setDescription("");
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors[colorScheme].background }}
      showsVerticalScrollIndicator={false}
    >
      <Header />

      {/* Título */}
      <View style={styles.containerMessage}>
        <Text style={[styles.message, { color: Colors[colorScheme].text }]}>
          Recompensas
        </Text>
      </View>

      {/* ENVIAR RECICLAGEM */}
      <View style={styles.recycleBox}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
          Enviar Reciclagem ♻️
        </Text>

        {/* Foto */}
        <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
          <Text style={styles.photoButtonText}>
            {photo ? "Trocar Foto" : "Adicionar Foto"}
          </Text>
        </TouchableOpacity>

        {photo && (
          <Image source={{ uri: photo }} style={styles.previewImage} />
        )}

        {/* Nome do item */}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: Colors[colorScheme].border2,
              color: Colors[colorScheme].text,
            },
          ]}
          placeholder="Nome do item (Ex: Garrafa PET)"
          placeholderTextColor="#aaa"
          value={itemName}
          onChangeText={setItemName}
        />

        {/* Descrição */}
        <TextInput
          style={[
            styles.textArea,
            {
              borderColor: Colors[colorScheme].border2,
              color: Colors[colorScheme].text,
            },
          ]}
          placeholder="Descrição"
          placeholderTextColor="#aaa"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Enviar */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme].button }]}
          onPress={handleSendRecycling}
        >
          <Text style={styles.buttonText}>Enviar para Análise</Text>
        </TouchableOpacity>
      </View>

      

      {/* Card de Pontos */}
      <View
        style={[
          styles.card,
          {
            borderColor: Colors[colorScheme].border2,
            backgroundColor: Colors[colorScheme].tint,
          },
        ]}
      >
        <Text style={[styles.PointsLabel, { color: Colors[colorScheme].icon }]}>
          Meus pontos
        </Text>
        <Text style={[styles.PointsValue, { color: Colors[colorScheme].icon }]}>
          {points}
        </Text>
        <Text style={[styles.conversionInfo, { color: Colors[colorScheme].icon }]}>
          100 pontos = R$ 1,00
        </Text>
      </View>

      {/* Conversão */}
      <View style={styles.convertBox}>
        <Text style={[styles.convertLabel, { color: Colors[colorScheme].text }]}>
          Converter pontos em dinheiro
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              borderColor: Colors[colorScheme].border2,
              color: Colors[colorScheme].text,
            },
          ]}
          placeholder="Ex: 200"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={valueToConvert}
          onChangeText={setValueToConvert}
        />

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                valueToConvert && parseInt(valueToConvert) <= points
                  ? Colors[colorScheme].button
                  : "#999",
            },
          ]}
          onPress={handleTransfer}
          disabled={!valueToConvert || parseInt(valueToConvert) > points}
        >
          <Text style={styles.buttonText}>Solicitar Transferência</Text>
        </TouchableOpacity>
      </View>

      {/* Histórico */}
      <View style={styles.historyBox}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
          Histórico de Transferências
        </Text>

        <Text style={[styles.historyItem, { color: Colors[colorScheme].text }]}>
          • 10/10/2025 — R$2,00 (200 pontos)
        </Text>
        <Text style={[styles.historyItem, { color: Colors[colorScheme].text }]}>
          • 15/09/2025 — R$1,50 (150 pontos)
        </Text>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerMessage: {
    padding: 20,
    alignItems: "center",
  },
  message: {
    fontSize: 24,
    fontWeight: "600",
  },
  card: {
    width: "90%",
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  PointsLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  PointsValue: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 5,
  },
  conversionInfo: {
    fontSize: 14,
  },
  convertBox: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 25,
  },
  convertLabel: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  historyBox: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    
  },
  textArea: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    height: 100,
    marginBottom: 15,
    textAlignVertical: "top",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 14,
    marginBottom: 5,
  },

  recycleBox: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 25,
  },
  photoButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default Reward;
