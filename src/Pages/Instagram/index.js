import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome6,
  Feather,
} from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
// import Gif from "react-native-gif"; // Import GIF component
import LottieView from "lottie-react-native";
import { db } from "../../../firebaseConfig";
import { DeleteItem } from "../../DeleteItems";

const Instagram = () => {
  const navigation = useNavigation();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [optionsShow, setOptionsShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to keep track of the selected image
  const [lastPress, setLastPress] = useState(0); // State to keep track of the last press time
  const [loveSymbolVisible, setLoveSymbolVisible] = useState(false); // State to keep track of the love symbol visibility
  const [showExplosion, setShowExplosion] = useState(false);
  const [instaImages, setInstaImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("instagramImage").get();
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInstaImages(newData);
        // yourComponentRef.current?.closeOptions();
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    {
      id: "1",
      name: "Your Story",
      profilePic: require("../../../assets/p (21).jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
    },
    {
      id: "2",
      name: '#sweatyy_pushpa',
      profilePic: require("./pushpa.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "3",
      name: "#Eeshw@ri",
      profilePic: require("./amma.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "4",
      name: "Se$h@giri",
      profilePic: require("./seshagiri.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "5",
      name: "#Narayana",
      profilePic: require("./nanna.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "6",
      name: "#m@ng@mm@",
      profilePic: require("./mangamma.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "7",
      name: "#Dorababu",
      profilePic: require("./dorababu.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "10",
      name: "@Pravalli",
      profilePic: require("./pravalli.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
  ];

  const datalist = [
    {
      id: "1",
      name: "Seshu",
      profilePic: require("../../../assets/whatsAppDp.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
    },
    {
      id: "2",
      name: "Seshu",
      profilePic: require("../../../assets/whatsAppDp.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "3",
      name: "Seshu",
      profilePic: require("../../../assets/whatsAppDp.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "4",
      name: "Seshu",
      profilePic: require("../../../assets/whatsAppDp.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
    {
      id: "5",
      name: "Seshu",
      profilePic: require("../../../assets/whatsAppDp.jpeg"),
      fullImage: require("../../../assets/whatsAppDp.jpeg"),
      isRainbow: true,
    },
  ];

  const deletePic = (id, prop) => {
    DeleteItem(id, prop, setDeleteAlert);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Shorts", { videos: "instagramVideo" })}
    >
      <View style={styles.profilePictureContainer}>
        {true && (
          <LinearGradient
            colors={["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rainbowCircle}
          />
        )}
        <Image source={item.profilePic} style={styles.profilePicture} />
        {item.name === "Your Story" && (
          <FontAwesome6
            name="circle-plus"
            size={24}
            color="#fff"
            style={[styles.plusiconpos, styles.plusIconYourStory]}
          />
        )}
      </View>
      <Text
        style={[
          styles.text,
          item.name === "Your Story" && styles.textYourStory,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );


  const closeDropdowns = () => {
    setDeleteAlert(false);
  };
  const handleHeartPress = () => {
    setShowExplosion(true);
    // Add any additional logic you need here, such as liking the post
  };
  return (
    <View>
      <FlatList
        style={{ height: 130 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.horizontalLine} />
      <StatusBar style="auto" />
      <ScrollView style={{ marginBottom: 150, marginTop: 0 }}>
        {instaImages.map((item) => (
          <View style={styles.fullImageContainer} key={item.id}>
            <View style={styles.container}>
              <View style={styles.left}>
                <Image
                  // source={{
                  //   uri: "https://firebasestorage.googleapis.com/v0/b/react-native-1-a785d.appspot.com/o/d80b087d-c51a-472b-a41e-f0192189cc8e.jpeg?alt=media&token=8af6f543-96e6-4502-bbbb-56a6d0011de9",
                  // }}
                  source={require('../../../assets/p (21).jpeg')}
                  style={styles.dpPicture}
                />
                <Text>Pavan_Padma</Text>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={20}
                  color="#049FF5"
                />
              </View>
              <TouchableOpacity
                style={styles.right}
                onPress={() => setOptionsShow(!optionsShow)}
              >
                <FontAwesome6
                  name="ellipsis-vertical"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {optionsShow && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  onPress={() =>
                    deletePic(item.id, { collectionName: "instagramImage" })
                  }
                >
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={() => handleImagePress(item.id)}>
              <Image source={{ uri: item.image }} style={styles.fullImage} />
              {/* {selectedImage === item.id && loveSymbolVisible && (
                <View style={styles.centeredLove}>
                  <Gif source={require('../../../assets/red-rose-heart.gif')} style={{ width: 100, height: 100 }} />
                </View>
              )}   */}
            </TouchableOpacity>
            <View style={[styles.container, styles.spacing]}>
              <View style={styles.left}>
                <TouchableOpacity onPress={handleHeartPress}>
                  <Ionicons
                    name="heart-outline"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                {/* {showExplosion && (
  <LottieView
    source={require('../../../assets/explosion-animation.json')}
    autoPlay
    loop={false} // Set loop to false to play the animation only once
    style={{ width: 100, height: 100 }}
  />
)} */}

                <Feather
                  name="message-circle"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <Feather name="send" size={24} color="black" />
              </View>
              <View style={styles.right}>
                <Feather name="bookmark" size={24} color="black" />
              </View>
            </View>
            <View style={styles.left}>
              <Text>1M likes</Text>
            </View>
            <TouchableOpacity style={styles.left}>
              <Text style={{ color: "gray" }}>View all 6 comments</Text>
            </TouchableOpacity>
            <View style={styles.left}>
              <Image
                 source={require("../../../assets/p (4).jpeg")}
                style={styles.dpPicture}
              />
              <TextInput style={styles.input} placeholder="Add a comment..." />
            </View>
            <View style={styles.left}>
              <Text style={{ color: "gray" }}>2 days ago</Text>
            </View>
          </View>
        ))}

        <Modal visible={deleteAlert} transparent={true}>
          <View style={styles.overlay}>
            <View style={styles.deletealert}>
              <Text>Deleted.. Refresh Again !</Text>
              <Ionicons name="cloud-done-outline" size={24} color="black" />
              <Button
                title="Ok"
                color="green"
                onPress={() => setDeleteAlert(false)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  deletealert: {
    backgroundColor: "lightpink",
    padding: 5,
    borderRadius: 15,
    alignItems: "center",
    width: "60%",
    height: undefined,
    aspectRatio: 1.4,
    gap: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  profilePictureContainer: {
    position: "relative",
    marginTop: 10,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  dpPicture: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 3,
    marginRight: 10,
  },
  name: {
    marginRight: "auto",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginTop: 5,
    fontSize: 13,
    maxWidth: 70,
    textAlign: "center",
  },
  textYourStory: {
    marginTop: -20,
  },
  rainbowCircle: {
    position: "absolute",
    top: -3,
    left: -3,
    width: 76,
    height: 76,
    borderRadius: 60,
  },
  spacing: {
    marginTop: 10,
  },
  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  plusIconYourStory: {
    top: -25,
    right: -40,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "lightgray",
    marginTop: 10,
    width: "100%",
  },
  fullImageContainer: {
    marginTop: 10,
  },
  fullImage: {
    width: "100%",
    height: 300,
    marginTop: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  right: {
    marginLeft: "auto",
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    right: 10,
    top: 40,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    zIndex: 10,
    width:120
  },
  deleteButton: {
    color: "#FF6347",
    textAlign:'center',
    fontSize:16,
  },
  centeredLove: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -55 }, { translateY: 40 }],
  },
});

export default Instagram;
