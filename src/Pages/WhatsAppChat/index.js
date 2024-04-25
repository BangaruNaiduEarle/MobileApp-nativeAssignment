import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";

const WhatsAppChat = ({ route }) => {
  const { chatData } = route.params;
  const backgroundImage = require("../../../assets/p (19).jpeg");

  const renderMessage = ({ item }) => {
    return (
      <View
        style={
          item.isMe
            ? styles.sentMessageContainer
            : styles.receivedMessageContainer
        }
      >
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={[styles.container]}>
        <FlatList
          data={chatData.messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    // backgroundColor:'lightgreen'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
    // Other styles for the background image if needed
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5",
    padding: 5,
    paddingRight: 0,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 0,
    maxWidth: "80%",
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "90%",
  },
  messageText: {
    fontSize: 16,
  },
});

export default WhatsAppChat;
