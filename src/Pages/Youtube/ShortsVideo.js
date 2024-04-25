import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Video } from "expo-av";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { db } from "../../../firebaseConfig";
import { Button } from "react-native";
import { DeleteItem } from "../../DeleteItems";
import { Ionicons } from "@expo/vector-icons";

const ShortsVideo = ({ route }) => {
  const { videos } = route.params;
  const [ytVideos, setYtVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState({});
  const [showControls, setShowControls] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [optionsShow, setOptionsShow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleOptions = () => {
    setOptionsShow(!optionsShow);
  };
  const closeOptionss = () => {
    setOptionsShow(false);
  };

  const videoRefs = useRef({});

  const handlePlayPause = async (index) => {
    if (isPlaying[index]) {
      await videoRefs.current[index].pauseAsync();
      setIsPlaying({ ...isPlaying, [index]: false });
    } else {
      await videoRefs.current[index].playAsync();
      setIsPlaying({ ...isPlaying, [index]: true });
      setCurrentVideoIndex(index);
    }
    setShowControls(true);
  };

  const handleVideoPress = () => {
    if (showControls) {
      setShowControls(false);
    } else {
      setShowControls(true);
    }
  };

  const handleVideoRelease = () => {
    setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const snapshot = await db.collection(videos).get();
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYtVideos(newData);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchVideoData();
  }, []);

  const deleteVideo = (id, prop) => {
    // console.log(id);
    DeleteItem(id, prop, setDeleteAlert);
  };

  const renderItem = ({ item }) => {
    // const item = {
    //   id: "1",
    //   video: require("./naga.mp4"),
    //   videoText: "nagaa",
    // };
    // console.log(item);
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          // height:undefined,
          // aspectRatio:0.5
          height: Dimensions.get("window").height - 145, // Subtracting 120 to make space for footer
        }}
      >
        <TouchableOpacity
          style={styles.videoTouchArea}
          onPress={() => handlePlayPause(item.id)}
          onTouchStart={handleVideoPress}
          onTouchEnd={handleVideoRelease}
          activeOpacity={1}
        >
          <Video
            ref={(ref) => (videoRefs.current[item.id] = ref)}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height - 125, // Subtracting 109 to make space for footer
            }}
            source={{
              uri: item.video,
            }}
            // source={item.video}
            resizeMode="cover"
            isLooping
            shouldPlay={
              currentVideoIndex === item.id ? isPlaying[item.id] : false
            }
            useNativeControls={false}
            onLoadStart={() => setShowControls(false)}
            onLoad={() => setShowControls(true)}
          />
          {!showControls && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="black"
            />
          )}

          {showControls && (
            <>
              {/* Play/Pause Button */}
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={() => handlePlayPause(item.id)}
              >
                <AntDesign
                  name={
                    currentVideoIndex === item.id && isPlaying[item.id]
                      ? "pause"
                      : "play"
                  }
                  size={52}
                  color="white"
                />
              </TouchableOpacity>

              {/* Side Button */}
              <View style={styles.sideOverlay}>
                <TouchableOpacity style={styles.sideButtons}>
                  <AntDesign name="like2" size={32} color="white" />
                  <AntDesign name="dislike2" size={32} color="white" />
                  <MaterialIcons name="message" size={32} color="white" />
                  <MaterialCommunityIcons
                    name="share"
                    size={32}
                    color="white"
                  />
                  <Feather
                    name="more-horizontal"
                    size={32}
                    color="white"
                    onPress={handleOptions}
                  />
                  {optionsShow && (
                    <View style={styles.optionsView}>
                      <Button
                        title="Remove video"
                        color={"#E8670E"}
                        onPress={() =>
                          deleteVideo(item.id, {
                            collectionName: videos,
                          })
                        }
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Channel Name and Subscribe Button */}
              <View style={styles.bottomOverlay}>
                <Image
                  source={require("../../../assets/p (5).jpeg")}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 50,
                  }}
                />
                <Text style={styles.channelName}>💕 Happy Anniversary 💞</Text>
                <TouchableOpacity
                  style={styles.subscribeButton}
                  onPress={closeOptionss}
                >
                  <Text style={styles.subscribeText}>Subscribe</Text>
                </TouchableOpacity>
              </View>
            </>
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
        </TouchableOpacity>
      </View>
    );
  };

  // if (videos === "instaVideos") {
  //   return console.log("instaVideos");
  // } else {
  return ytVideos.length > 0 ? (
    <FlatList
      data={ytVideos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      pagingEnabled
      scrollEventThrottle={16}
    />
  ) : (
    <View style={styles.container}></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoTouchArea: {
    width: "100%",
  },
  vid: {
    width: "100%",
  },
  playPauseButton: {
    position: "absolute",
    alignSelf: "center",
    top: "45%",
    zIndex: 1,
  },
  sideOverlay: {
    position: "absolute",
    bottom: 75,
    right: 10,
  },
  sideButtons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 30,
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  channelName: {
    marginLeft: 10,
    color: "black",
    fontSize:17
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
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

  optionsView: {
    position: "absolute",
    zIndex: 10,
    right: 37,
    bottom: 5,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    width: 150,
    padding: 4,
  },
  subscribeButton: {
    marginLeft: "auto",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  subscribeText: {
    color: "white",
    marginLeft: "auto",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

export default ShortsVideo;
