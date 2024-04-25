import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { DeleteItem } from "../DeleteItems";

const YourComponent = React.forwardRef(
  ({ alertVisible, image, text1, text2, showAlert, hideAlert, each }, ref) => {
    const [optionsShow, setOptionsShow] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);

    const handleOptions = () => {
      setOptionsShow(!optionsShow);
    };
    const closeOptionss = () => {
      setOptionsShow(false);
    };
    React.useImperativeHandle(ref, () => ({
      closeOptions: () => {
        closeOptionss();
      },
    }));

    const deletePic = (id, prop) => {
      DeleteItem(id, prop, setDeleteAlert);
    };

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => {
              showAlert();
              setOptionsShow(false);
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOptionsShow(false);
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Cheers to 2 yrs🎉💞 #Pavan #Padma 💍🥂
              </Text>
              <MaterialCommunityIcons
                onPress={handleOptions}
                name="dots-vertical"
                size={22}
                color="black"
              />
              {optionsShow && (
                <View style={styles.optionsView}>
                  <Button
                    title="Remove Pic"
                    onPress={() =>
                      deletePic(each.id, { collectionName: "youtubeImage" })
                    }
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {alertVisible && (
          <CustomAlert
            visible={alertVisible}
            onClose={hideAlert}
            image={image}
            text2={text2}
          />
        )}

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
      </View>
    );
  }
);

const CustomAlert = ({ hideAlert, visible, onClose, image, text2 }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.alert}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.alertText}>
                Two years of love 💖, laughter😂, & the sweetest symphony 🎻🎶.  
                💕 Happy Anniversary 💞
              </Text>
            </View>
          </View>
          <LottieView
            // source={require("../../assets/weddingAnimate.json")}
            source={require("../../assets/lovee.json")}
            autoPlay
            loop={true}
            speed={0.7}
            style={{
              position: "absolute",
              width: "104%",
              height: "64%",
              bottom: "20%",
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
    marginTop: 8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  text: {
    textAlign: "left",
    color: "black",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayy: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsView: {
    position: "absolute",
    zIndex: 10,
    right: 35,
    top: -10,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "gray",
    borderWidth: 1,
    width: 120,
    padding: 3,
  },
  alert: {
    backgroundColor: "#349FCA",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "88%",
    height: undefined,
    aspectRatio: 0.68,
  },
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
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    objectFit: "fill",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 56,
  },
  alertText: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: "yellow",
    textAlign: "center",
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

export default YourComponent;
