import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Colors } from "../../constants/theme";
import Header from "@/components/header";

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Reward;
