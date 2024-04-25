import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WhatsApp = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const data = [
    {
      id: "1",
      name: "Bava 💕🥰",
      lastMessage: "Happy anniversary",
      seen: true,
      time: "11:30 AM",
      profileImage: require("../../../assets/whatsAppDp.jpeg"),
      messages: [
        {
          id: "1",
          message:
            "Hey you, guess what? I've got the perfect anniversary surprise planned for us!",
          isMe: false,
        },
        {
          id: "2",
          message:
            " Oh no, what's up? You know I'm not a huge fan of surprises.",
          isMe: true,
        },
        {
          id: "3",
          message:
            "Trust me, this one's gonna knock your socks off! We're going on a trip to Araku!",
          isMe: false,
        },
        {
          id: "4",
          message: "Araku? But... but I have so much work to do, and it's such short notice...",
          isMe: true,
        },
        {
          id: "5",
          message:
            " No excuses this time, mister! We've been planning this forever, and it's our anniversary! Work can wait, but this trip can't.",
          isMe: false,
        },
        {
          id: "6",
          message:
            "But what about all the emails I'll miss, and the deadlines...",
          isMe: true,
        },
        {
          id: "7",
          message:
            "Oh, come on! Araku awaits us with its beautiful valleys and waterfalls. And trust me, the Wi-Fi there is not that great, so you won't even be tempted to check your emails!",
          isMe: false,
        },
        {
          id: "8",
          message:
            "sigh Alright, alright, you win. But you owe me big time for this.",
          isMe: true,
        },
        {
          id: "9",
          message:
            "I promise it'll be worth it! Picture this: us, surrounded by nature, sipping on hot chai, and making memories together.",
          isMe: false,
        },
        {
          id: "10",
          message:
            "Fine, fine. But I reserve the right to complain about bugs and humidity.",
          isMe: true,
        },
        {
          id: "11",
          message:
            " Deal! Now, let's pack our bags and get ready for the adventure of a lifetime. Happy anniversary, my love!",
          isMe: false,
        },
        {
          id: "12",
          message: " Happy anniversary, sweetheart. To Araku we go, bugs and all! 🌿🎉",
          isMe: true,
        },
        {
          id: "13",
          message: "And if you're lucky, maybe we'll even find a Wi-Fi spot for you to sneakily check your emails!",
          isMe: false,
        },
        {
          id: "14",
          message: "Oh joy, just what I always wanted!",
          isMe: true,
        },
      ],
    },
  ];

  const resetModalState = () => {
    setModalVisible(false);
    setSelectedProfile(null);
  };
  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      {/* <TouchableOpacity
      style={styles.modalContainer}
      onPress={() => setModalVisible(false)}
    > */}
      {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}> */}
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlayBackground} />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        {/* <view style={styles.modalImage}> */}
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() =>
            navigation.navigate("ProfileScreen", {
              name: selectedProfile.name,
              profileImage: selectedProfile.profileImage,
            })
          }
        >
          {/* <View>
          <Text>hello</Text>
          </View> */}
          {/* <view style={styles.modalbg}> */}
          <ImageBackground
            source={selectedProfile?.profileImage}
            style={styles.modalImage}
          />

          <View style={styles.modalOverlay}>
            <Text style={styles.modalName}>{selectedProfile?.name}</Text>
          </View>
        </TouchableOpacity>
        {/* </view> */}
        {/* </view> */}

        <View style={styles.modalActions}>
          <TouchableOpacity onPress={() => console.log("Message icon pressed")}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={25}
              color="rgb(4, 171, 163)"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Video call icon pressed")}
          >
            <MaterialCommunityIcons
              name="video"
              size={25}
              color="rgb(4, 171, 163)"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Phone icon pressed")}>
            <MaterialCommunityIcons
              name="phone"
              size={25}
              color="rgb(4, 171, 163)"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Info icon pressed")}>
            <MaterialCommunityIcons
              name="information-outline"
              size={25}
              color="rgb(4, 171, 163)"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const toggleModal = (profile) => {
    setSelectedProfile(profile);
    renderModal();
    setModalVisible(true);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("WhatsAppChat", { chatData: item })}
      style={styles.chatItem}
    >
      <TouchableOpacity onPress={() => toggleModal(item)}>
        <Image source={item.profileImage} style={styles.profileImage} />
      </TouchableOpacity>
      <View style={styles.chatDetails}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("WhatsAppChat", { chatData: item })
          }
        >
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.messageContainer}>
            {item.seen ? (
              <MaterialCommunityIcons
                name="check-all"
                size={20}
                color="gray"
                style={styles.icon}
              />
            ) : null}
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {modalVisible && renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lastMessage: {
    flex: 1,
    color: "gray",
    marginLeft: 5, // Add margin to separate message from icon
  },
  icon: {
    marginRight: 5, // Add margin to separate icon from message
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalImage: {
    position: "absolute",
    top: "18%",
    left: "15%",
    width: "84%",
    height: 250,
  },
  modalOverlay: {
    // backgroundColor: "#ffffff00",
    backgroundColor: "#ffffff00",
    // backgroundColor: "green",
    padding: 6,
    width: "70.5%",
    position: "absolute",
    top: "18%",
    left: "15%",
    // border: "2px solid red",
  },
  modalName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "black",
    padding: 10,
    width: "70.5%",
    position: "absolute",
    top: "49%",
    left: "15%",
  },
  modalOverlayBackground: {
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // border: "2px solid green",
  },
});

export default WhatsApp;
