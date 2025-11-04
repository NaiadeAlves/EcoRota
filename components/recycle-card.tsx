import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/theme";
import { ImageSourcePropType } from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  title: string;
  description: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  colorScheme: "light" | "dark";
}

export default function RecyclableCard({ title, description, image, backgroundColor, colorScheme, }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleCard = () => {
    // adiciona animação suave no abrir/fechar
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.card, { backgroundColor: backgroundColor, borderColor: Colors[colorScheme].border2 }]}>
      <Pressable style={styles.cardHeader} onPress={toggleCard}>
        <Image source={image} style={{ width: 80, height: 80 }} />
        <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={Colors[colorScheme].text}
        />
      </Pressable>

      {expanded && (
        <View style={styles.cardContent}>
          <Text style={{ color: Colors[colorScheme].text }}>{description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 380,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    marginTop: 10,
  },
  materials: {
    width: 80,
    height: 80,
  },
});
