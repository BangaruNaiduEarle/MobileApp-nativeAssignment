import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import YourComponent from "../../CustomAlert";
import Shorts from "./Shorts";
import { db } from "../../../firebaseConfig";
import LottieView from "lottie-react-native"; // Import LottieView
import { useNavigation } from "@react-navigation/native";

const Youtube = () => {
  const navigation = useNavigation();
  const [ytPics, setYtPics] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  
  const yourComponentRef = useRef(null);

  const triggerChildFunction = () => {
    yourComponentRef.current?.closeOptions();
  };

  const data = [
    { id: "1", name: "All" },
    { id: "2", name: "Music" },
    { id: "3", name: "Telugu Cinema" },
    { id: "4", name: "Watched" },
    { id: "5", name: "Magic" },
    { id: "6", name: "Birth day's" },
    { id: "7", name: "Romance" },
    { id: "8", name: "Nature Video" },
    { id: "9", name: "TED Talk" },
    // Add more items as needed
  ];

  const showAlert = (image) => {
    setSelectedImage(image);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("youtubeImage").get();
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYtPics(newData);
        yourComponentRef.current?.closeOptions();
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, [clicked]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setClicked(!clicked);
      }}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <ScrollView style={{ marginBottom: 55 }}>
        <View style={styles.container}>
          {ytPics.length > 0 ? (
            ytPics.map((each, index) => (
              <View
                key={index}
                style={{
                  paddingTop: 5,
                  height: 280,
                  width: "98%",
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    showAlert(each.image);
                    triggerChildFunction();
                  }}
                >
                  <Image
                    source={{ uri: each.image }}
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "fill",
                      alignSelf: "center",
                      borderRadius: 4,
                    }}
                  />
                </TouchableOpacity>
                <YourComponent
                  image={each.image}
                  text1={each.text1}
                  text2={each.text2}
                  showAlert={() => showAlert(each.image)}
                  hideAlert={hideAlert}
                  alertVisible={alertVisible && selectedImage === each.image}
                  each={each}
                  ref={yourComponentRef}
                />
              </View>
            ))
          ) : (
            <View style={styles.skeltoncontainer}>
              <View style={styles.skeltonplaceholder} />
              <View style={styles.skeltonplaceholder} />
              <View style={styles.skeltonplaceholder} />
              <Button style={{width:100}}
                onPress={() => navigation.navigate("UploadPics")}
                title="No Pics.. Upload Now"
              />
            </View>
          )}
        </View>
        <Shorts />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 12,
    marginStart: 10,
    marginEnd: 2,
    marginBottom: 7,
    backgroundColor: "lightgray",
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: "black",
    padding: 4,
    paddingStart: 12,
    paddingEnd: 12,
    textAlign: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  skeltoncontainer: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: undefined,
    aspectRatio: 0.6,
    borderRadius: 13,
    padding: 6,
    marginBottom: 0,
    marginTop: 4,
  },
  skeltonplaceholder: {
    backgroundColor: "#ccc",
    width: "100%",
    height: undefined,
    aspectRatio: 2.1,
    borderRadius: 4,
    marginBottom: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alert: {
    backgroundColor: "rgba(0, 128, 0, 0.95)",
    padding: 40,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
    height: undefined,
    aspectRatio: 0.75,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
    borderRadius: 30,
    marginBottom: 10,
  },
  alertText: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.9)",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    padding: 5,
  },
});

export default Youtube;
