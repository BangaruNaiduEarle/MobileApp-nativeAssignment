import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  MaterialCommunityIcons,
  EvilIcons,
  Ionicons,
  Entypo
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";



const { width } = Dimensions.get("window");

const MusicPlayer = ({route}) => {

  const { MusicScreenData } = route.params;
  console.log("Naidu");
  console.log(MusicScreenData);
  
  const musicImages = MusicScreenData.map(each => each.image) 
  // console.log(musicImages)


  const data = [
    {
      title: "Padma Album 🎶",
      artist: "Singer🎙️ : M Kameshwari 🥰",
      image: MusicScreenData,
      url: require("../adhipurush.mp3"),
      id: "1",
    },
    {
      title: "Pavan Collections 🎶",
      artist: "Singer 🎙️: Pavan Kumar Kota 😘",
      image:MusicScreenData,
      url: require("../nanna.mp3"),
      id: "2",
    },
    {
      title: "Wedding Memories 🎶",
      artist: "Singer 🎙️: kota_pavan 😘",
      image:MusicScreenData,
      url: require("../liger.mp3"),
      id: "3",
    },
    {
      title: "Pavan 👩🏻‍❤️‍👨🏻 Padma 🎶",
      artist: "Singer🎙️: Bujji 😍",
      image:MusicScreenData,
      url: require("../kothaBangaruLokam.mp3"),
      id: "4",
    },
    {
      title: "Pavan collections List🎶",
      artist: "Singer 🎙️: Bava 😘",
      image:MusicScreenData,
      url: require("../suryaSonOfKrishna1.mp3"),
      id: "5",
    },
    {
      title: "Pavan Album 🎶",
      artist: "Singer 🎙️: Bava 🤩",
      image:MusicScreenData,
      url: require("../suryaSonOfKrishna2.mp3"),
      id: "6",
    },
    
  ];


  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const [sound, setSound] = useState(null);
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!isPlaying || !duration) return;

    const interval = setInterval(() => {
      const newPosition = position; // Increment position by 1 second
      const newIndex = Math.floor(
        (newPosition / duration) * (data[songIndex].image.length * 2)
      ); // Double the length for looping

      setPosition(newPosition);
      setSongIndex(newIndex % data[songIndex].image.length); // Use modulo to loop the images
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, position, duration, songIndex]);

  useEffect(() => {
    if (songSlider.current && isPlaying && duration) {
      const newPosition = (position / duration) * width;
      songSlider.current.scrollToOffset({
        offset: newPosition * 15,
        animated: true,
      });
    }
  }, [position, duration, isPlaying]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        data[songIndex].url
      );
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    };
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [songIndex]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayback = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const skipNext = () => {
    setSongIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const skipPrevious = () => {
    setSongIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const renderSongs = ({ item }) => {
    return (
      <Animated.View
        style={{ width: 326, justifyContent: "center", alignItems: "center" }}
      >
        <View style={MusicPlayerStyles.artWorkWrapper}>
          <Image source={{uri:item}} style={MusicPlayerStyles.artWorkImage} />
        </View>
      </Animated.View>
    );
  };

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0).padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <LinearGradient
      colors={["#CA4C31", "#584B48"]}
      style={MusicPlayerStyles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={MusicPlayerStyles.mainContainer}>
          <StatusBar barStyle="light-content" />
          <Animated.FlatList
            ref={songSlider}
            data={[...data[songIndex].image, ...data[songIndex].image]} // Extend the image array to loop
            renderItem={renderSongs}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width} // Set snapToInterval to the width of the screen for smooth sliding
            decelerationRate="fast" // Set decelerationRate for faster sliding
            scrollEventThrottle={16}
          />
          <View style={MusicPlayerStyles.titleContainer}>
            <View style={MusicPlayerStyles.contentContainer}>
              <Text style={MusicPlayerStyles.songTitle}>
                {data[songIndex].title}
              </Text>
              <Text style={MusicPlayerStyles.songArtist}>
                {data[songIndex].artist}
              </Text>
            </View>
            <Ionicons
              name="add-circle-outline"
              size={30}
              color="white"
              style={MusicPlayerStyles.addIcon}
            />
          </View>
          <View style={MusicPlayerStyles.progressBarContainer}>
            <Slider
              style={MusicPlayerStyles.progressContainer}
              value={(position / duration) * 100}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor="#ffffff"
              minimumTrackTintColor="#e0e0e0"
              maximumTrackTintColor="#e0e0e0"
              onSlidingComplete={() => {}}
            />  
            <View style={MusicPlayerStyles.progressLabelContainer}>
              <Text style={MusicPlayerStyles.progressLabelText}>
                {formatTime(position)}
              </Text>
              <Text style={MusicPlayerStyles.progressLabelText}>
                {formatTime(duration)}
              </Text>
            </View>
          </View>
        </View>
        <View style={MusicPlayerStyles.musicControlls}>
          <TouchableOpacity>
            <Ionicons name="shuffle" size={24} color="gray" />
          </TouchableOpacity>
          <View style={MusicPlayerStyles.playControlls}>
            <TouchableOpacity onPress={skipPrevious}>
              <Ionicons name="play-skip-back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayback}>
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={60}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipNext}>
              <Ionicons name="play-skip-forward" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="repeat" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={MusicPlayerStyles.bottomContainer}>
          <MaterialCommunityIcons
            name="phone-rotate-landscape"
            size={18}
            color="white"
          />
          <View style={MusicPlayerStyles.icons}>
            <EvilIcons name="share-google" size={24} color="white" />
            <MaterialCommunityIcons name="menu" size={24} color="white" />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const MusicPlayerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  artWorkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 24,
    paddingTop: 10,
  },
  artWorkImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  contentContainer: {
    width: "80%",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songTitle: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
  songArtist: {
    color: "#e0e0e0",
    fontSize: 16,
  },
  icons: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBarContainer: {},
  progressContainer: {
    width: width,
    height: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: 340,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 16,
  },
  progressLabelText: {
    color: "#e0e0e0",
    fontSize: 12,
  },
  musicControlls: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  playControlls: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

// export default MusicPlayer;

export default MusicPlayer;
