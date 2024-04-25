import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Alert,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import RNPickerSelect from "react-native-picker-select";

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { firebase, db } from "../../../firebaseConfig";

import { useNavigation } from "@react-navigation/native";

const UploadPics = () => {
  const navigation = useNavigation();

  // const [id, setId] = useState('');
  const [image, setImage] = useState(null);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [video, setVideo] = useState(null);
  const [videoText, setVideoText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);

  const [spotifyValue, setSpotifyValue] = useState(null);

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveSpotifyImage = async () => {
    const collection = `spotify${spotifyValue}Image`;
    console.log(collection)
    setIsLoading(true);
    if (spotifyValue !== null) {
      try {
        // Convert local image URI to blob

        const { uri } = await FileSystem.getInfoAsync(image);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Network Request Failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });

        const filename = image.substring(image.lastIndexOf("/") + 1);
        const imageRef = firebase.storage().ref().child(filename);
        // const imageRef = storage.ref().child(filename);

        await imageRef.put(blob);

        // Get image download URL
        const imageUrl = await imageRef.getDownloadURL();
        // Add data to Firestore
        console.log({
          image: imageUrl,
          text1,
          text2,
        });
        await db.collection(collection).add({
          image: imageUrl,
          text1,
          text2,
        });

        // Clear input fields
        // setId('');
        setImage(null);
        setText1("");
        setText2("");
        setIsLoading(false);
        // Show success message
        Alert.alert("Success", "Image uploaded successfully");
      } catch (error) {
        console.error("Error saving data:", error);
        // Show error message
        Alert.alert("Error", "Failed to upload image. Please try again later.");
      }
    } else {
      Alert.alert("select a category");
      setIsLoading(false);
    }
  };

  const handleChooseSpotifyImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChooseVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  const handleSaveVideo = async () => {
    const collection = `${selectedValue}Video`;
    setIsLoading(true);

    if (selectedValue !== null) {
      try {
        // Convert local image URI to blob

        const { uri } = await FileSystem.getInfoAsync(video);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Network Request Failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });

        const filename = video.substring(video.lastIndexOf("/") + 1);
        const videoRef = firebase.storage().ref().child(filename);
        // const imageRef = storage.ref().child(filename);

        await videoRef.put(blob);

        // Get video download URL
        const videoUrl = await videoRef.getDownloadURL();
        // Add data to Firestore
        console.log({
          video: videoUrl,
          videoText,
        });
        await db.collection(collection).add({
          video: videoUrl,
          videoText,
        });

        // Clear input fields
        // setId('');
        setVideo(null);
        setVideoText("");
        setIsLoading(false);
        // Show success message
        Alert.alert("Success", "video uploaded successfully");
      } catch (error) {
        console.error("Error saving data:", error);
        // Show error message
        Alert.alert("Error", "Failed to upload image. Please try again later.");
      }
    } else {
      Alert.alert("Select An App");
      setIsLoading(false);
    }
  };

  const handleSaveImage = async () => {
    const collection = `${selectedValue}Image`;
    setIsLoading(true);

    if (selectedValue !== null) {
      try {
        // Convert local image URI to blob

        const { uri } = await FileSystem.getInfoAsync(image);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Network Request Failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });

        const filename = image.substring(image.lastIndexOf("/") + 1);
        const imageRef = firebase.storage().ref().child(filename);
        // const imageRef = storage.ref().child(filename);

        await imageRef.put(blob);

        // Get image download URL
        const imageUrl = await imageRef.getDownloadURL();
        // Add data to Firestore
        console.log({
          image: imageUrl,
          text1,
          text2,
        });
        await db.collection(collection).add({
          image: imageUrl,
          text1,
          text2,
        });

        // Clear input fields
        // setId('');
        setImage(null);
        setText1("");
        setText2("");
        setIsLoading(false);
        // Show success message
        Alert.alert("Success", "Image uploaded successfully");
      } catch (error) {
        console.error("Error saving data:", error);
        // Show error message
        Alert.alert("Error", "Failed to upload image. Please try again later.");
      }
    } else {
      Alert.alert("Select An App");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={addMediaPageStyles.uploadPageContainer}>
      {/* ======== input fields ========= */}

      <View>
        <View style={addMediaPageStyles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: "Select An App", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "YOUTUBE", value: "youtube" },
              { label: "INSTAGRAM", value: "instagram" },
              { label: "SPOTIFY", value: "spotify" },
            ]}
          />
        </View>

        {selectedValue === "spotify" && (
          <View style={addMediaPageStyles.pickerContainer}>
            <RNPickerSelect
              placeholder={{ label: "Select a Collection", value: null }}
              onValueChange={(value) => setSpotifyValue(value)}
              items={[
                { label: "MY ALBUM", value: "myAlbum" },
                { label: "MEMORIES", value: "memories" },
                { label: "THROW BACKS", value: "throwBacks" },
                { label: "MADE FOR YOU", value: "madeForYou" },
                { label: "FRIENDS", value: "friends" },
              ]}
            />
          </View>
        )}

        {image && (
          <View style={addMediaPageStyles.selectedImgContainer}>
            <Image
              source={{ uri: image }}
              style={{ width: 140, height: 140 }}
            />
            <AntDesign
              name="delete"
              size={24}
              color="black"
              onPress={() => setImage(null)}
            />
          </View>
        )}
        <TextInput
          placeholder="Image short Text"
          value={text1}
          onChangeText={setText1}
          style={addMediaPageStyles.textInput}
        />

        <TextInput
          placeholder="Image Long Text"
          value={text2}
          onChangeText={setText2}
          style={addMediaPageStyles.textInput}
        />

        {selectedValue === "spotify" ? (
          <>
            <View style={addMediaPageStyles.buttonsContainer}>
              <View style={addMediaPageStyles.buttons}>
                <Button
                  title="Choose Image"
                  onPress={handleChooseSpotifyImage}
                />
              </View>
              <View style={addMediaPageStyles.buttons}>
                <Button title="Save" onPress={handleSaveSpotifyImage} />
              </View>
            </View>
          </>
        ) : (
          <View style={addMediaPageStyles.buttonsContainer}>
            <View style={addMediaPageStyles.buttons}>
              <Button title="Choose Image" onPress={handleChooseImage} />
            </View>
            <View style={addMediaPageStyles.buttons}>
              <Button title="Save" onPress={handleSaveImage} />
            </View>
          </View>
        )}

        {isLoading && (
          <View style={addMediaPageStyles.loader}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}

        <View style={addMediaPageStyles.horizontalLine}></View>

        <View style={addMediaPageStyles.videoContainer}>
          {video && (
            <View style={addMediaPageStyles.selectedImgContainer}>
              <Image
                source={{ uri: video }}
                style={{ width: 140, height: 140 }}
              />
              <AntDesign
                name="delete"
                size={24}
                color="black"
                onPress={() => setVideo(null)}
              />
            </View>
          )}
          <TextInput
            placeholder="video short Text"
            value={videoText}
            onChangeText={setVideoText}
            style={addMediaPageStyles.textInput}
          />

          <View style={addMediaPageStyles.buttonsContainer}>
            <View style={addMediaPageStyles.buttons}>
              <Button title="Choose Video" onPress={handleChooseVideo} />
            </View>
            <View style={addMediaPageStyles.buttons}>
              <Button title="Save" onPress={handleSaveVideo} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const addMediaPageStyles = StyleSheet.create({
  uploadPageContainer: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 6,
    marginTop: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    marginTop: 30,
  },
  buttons: {
    width: "40%",
  },
  saveBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  saveBtn: {
    width: "40%",
  },
  textInput: {
    fontSize: 16,
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20, // Adjust margin bottom as needed
    marginTop: 20,
  },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  selectedImgContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
});

export default UploadPics;
