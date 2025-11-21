import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
    profilePhoto: null, // 👈 foto do usuário
  });

  // Carrega o usuário do AsyncStorage quando o app inicia
  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("userId");
      const name = await AsyncStorage.getItem("userName");
      const email = await AsyncStorage.getItem("userEmail");

      // carregar foto específica desse usuário
      let profilePhoto = null;
      if (id) {
        profilePhoto = await AsyncStorage.getItem(`profilePhoto_${id}`);
      }

      setUser({ id, name, email, profilePhoto });
    })();
  }, []);

  // Função para atualizar o usuário globalmente
  const updateUser = async (newData) => {
    if (newData.id) await AsyncStorage.setItem("userId", newData.id);
    if (newData.name) await AsyncStorage.setItem("userName", newData.name);
    if (newData.email) await AsyncStorage.setItem("userEmail", newData.email);

    // salvar foto caso venha nova
    if (newData.profilePhoto && newData.id) {
  await AsyncStorage.setItem(`profilePhoto_${newData.id}`, newData.profilePhoto);
}


    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

