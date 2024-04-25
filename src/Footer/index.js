import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  console.log("my first android app");

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
    <View style={styles.tabs}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Youtube")}
        style={styles.footerIcons}
      >
        <FontAwesome6 name="youtube" size={28} color="#FF0000" />
        <Text style={{ fontSize: 14 }}>Youtube </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("WhatsApp")}
        style={styles.footerIcons}
      >
        <FontAwesome6 name="whatsapp" size={28} color="#128C7E" />
        <Text style={{ fontSize: 14 }}>Whatsapp</Text>
      </TouchableOpacity>


           {/* ========= Plus ======= */}

      <TouchableOpacity
        onPress={() =>navigation.navigate("UploadPics")}
        style={styles.footerIcons}
      >
        <AntDesign name="pluscircleo" size={35} color="#31363F" />
      </TouchableOpacity>



      <TouchableOpacity
        onPress={() => navigation.navigate("Instagram")}
        style={styles.footerIcons}
      >
        <FontAwesome6
          name="instagram"
          size={28}
          color={"#E1306c"}
          title="Open Folder Picker"
        />
        <Text style={{ fontSize: 14 }}>Instagram </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Spotify")}
        style={styles.footerIcons}
      >
        <FontAwesome6 name="spotify" size={28} color="#1DB954" />
        <Text style={{ fontSize: 14 }}>Spotify </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    width: "100%",
    height:'8.5%',
    borderWidth: 0.2,
    borderColor: "gray",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
    paddingBottom: 3,
    paddingTop: 6,
    backgroundColor: "#fff",
    color: "red",
  },
  footerIcons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
