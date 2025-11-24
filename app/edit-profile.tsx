import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import { Colors } from "../constants/theme";
import { useUser } from "../contexts/UserContext";
import { ActivityIndicator } from "react-native";

const EditProfile = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const userId = await AsyncStorage.getItem("userId");
        const storedPhoto = await AsyncStorage.getItem(
          `profilePhoto_${userId}`
        );

        if (storedPhoto) {
          setUser({ profilePhoto: storedPhoto });
        }

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);

        console.log("EditProfile: Dados carregados", {
          name: storedName,
          email: storedEmail,
        });
      } catch (error) {
        console.error("Erro ao carregar dados no EditProfile:", error);
      }
    };

    loadUserData();
  }, []);

  const saveImagePermanent = async (uri: string, userId: string | null) => {
    try {
      const documentDir = (FileSystem as any).documentDirectory;

      if (!documentDir) {
        console.log("documentDirectory indisponível");
        return uri;
      }

      if (!userId) {
        console.log("Erro: userId ausente");
        return uri;
      }

      const fileName = `profile_${userId}.jpg`;
      const newPath = documentDir + fileName;

      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      return newPath;
    } catch (error) {
      console.log("Erro ao salvar imagem:", error);
      return uri;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header />
        {/* Loading */}
              {loading && (
                <ActivityIndicator
                  size="large"
                  color={Colors[colorScheme].button}
                  style={{ marginBottom: 10 }}
                />
              )}
        {/*botão de voltar e título da tela*/}
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Pressable
              style={[
                styles.backButton,
                {
                  borderColor: Colors[colorScheme].border,
                  backgroundColor: Colors[colorScheme].border,
                },
              ]}
              //volta para Perfil
              onPress={() => router.push("/(tabs)/profile")}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color={Colors[colorScheme].icon}
              />
            </Pressable>
            <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
              Editar Perfil
            </Text>
          </View>
          {/*imagem de perfil*/}
          <Image
            source={
              user.profilePhoto
                ? { uri: user.profilePhoto }
                : require("../assets/images/profile-test.jpg")
            }
            style={[
              styles.profile,
              { borderColor: Colors[colorScheme].border },
            ]}
          />

          <Pressable
            style={[
              styles.changePhotoButton,
              { backgroundColor: Colors[colorScheme].button },
            ]}
            onPress={async () => {
              const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (permission.status !== "granted") {
                alert("Permissão necessária para acessar suas fotos.");
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });

              if (!result.canceled) {
                const uri = result.assets[0].uri;

                const userId = await AsyncStorage.getItem("userId");

                //Salva a imagem permanentemente
                const finalPath = await saveImagePermanent(uri, userId);

                //Salva no AsyncStorage
                await AsyncStorage.setItem(`profilePhoto_${userId}`, finalPath);

                setUser({
                  ...user,
                  profilePhoto: finalPath,
                });

                console.log("Foto permanente salva em:", finalPath);
              }
            }}
          >
            <Text style={styles.changePhotoText}>Mudar foto</Text>
          </Pressable>

          <SafeAreaView style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setName}
              value={name}
              placeholder="Maria"
              placeholderTextColor={Colors[colorScheme].text}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setEmail}
              value={email}
              placeholder="maria123@gmail.com"
              placeholderTextColor={Colors[colorScheme].text}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setPassword}
              value={password}
              placeholder="Digite sua senha"
              placeholderTextColor={Colors[colorScheme].text}
              secureTextEntry={true}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirme sua senha"
              placeholderTextColor={Colors[colorScheme].text}
              secureTextEntry={true}
            />
          </SafeAreaView>

          <View style={styles.pContain}></View>

          {/*botão que redireciona para a tela principal*/}
          <View>
            <Pressable
              style={[
                styles.saveButton,
                { backgroundColor: Colors[colorScheme].button },
              ]}
              onPress={async () => {
                setLoading(true);
                try {
                  const token = await AsyncStorage.getItem("userToken");
                  const userId = await AsyncStorage.getItem("userId");

                  const response = await fetch(
                    "https://ecorota-2.onrender.com/api/users/update",
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        id: userId,
                        name,
                        email,
                        password: password.trim() === "" ? undefined : password,
                      }),
                    }
                  );

                  const data = await response.json();

                  if (!response.ok) {
                    console.log("Erro no backend:", data);
                    return;
                  }

                  // Atualiza no AsyncStorage
                  await AsyncStorage.setItem("userEmail", email);
                  await AsyncStorage.setItem("userName", name);

                  setUser({ name, email });

                  console.log("Perfil atualizado com sucesso!");
                  router.push("/(tabs)/profile");
                } catch (error) {
                  console.error("Erro ao salvar alterações:", error);
                }
              }}
            >
              <Text style={styles.saveText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  profile: {
    marginTop: 30,
    marginBottom: 30,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50,
  },
  saveButton: {
    width: "150%",
    alignItems: "center",
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
  },

  pContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    position: "absolute",
    left: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    width: "100%",
  },

  changePhotoButton: {
    width: "30%",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: -10,
  },
  changePhotoText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditProfile;
