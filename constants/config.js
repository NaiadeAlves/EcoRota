import { Platform } from "react-native";

// URL do backend
const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"     // para abrir no computador
    : "http://192.168.3.61:3000"; // para acessar pelo celular na mesma rede Wi-Fi

