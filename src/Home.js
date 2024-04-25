import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "./Footer";

export default function Home() {
  const navigation = useNavigation();
  // console.log("my first android app");

  // ========openFolderPicker for pic upload================

  // const openFolderPicker = async () => {
  //   try {
  //     const res = await DocumentPicker.pickDirectory();
  //     console.log("Folder picked:", res);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log("Folder picker cancelled");
  //     } else {
  //       console.error("Error picking folder:", err);
  //     }
  //   }
  // };

  return (
    <>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
