import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { db } from "../../../firebaseConfig";
import { DeleteItem } from "../../DeleteItems";

import MusicPlayer from "./MusicPlayer";

const Spotify = () => {
  const navigation = useNavigation();
  const [spotifyPics, setSpotifyPics] = useState([]);
  const [memoryPics, setMemoryPics] = useState([]);
  const [throwBacksPics, setThrowBacksPics] = useState([]);
  const [madeForYouPics, setMadeForYouPics] = useState([]);
  const [friendsPics, setFriendsPics] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [optionsShow, setOptionsShow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [selctdID, setSelctdID] = useState();

  // console.log()

  const [musicPlayerImgs, setMusicPlayerImgs] = useState([]);
  let uniqueImgs = [];
  const fetchCollectionData = async (collectionName, stateSetter) => {
    try {
      const snapshot = await db.collection(collectionName).get();
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      stateSetter(newData);
      const musicImages = newData.map((each) => each.image);

      // console.log(
      //   musicPlayerImgs.filter(
      //     (each) => each !== musicImages.map((each) => each)
      //   )

      // );

      musicImages.forEach((each) => {
        if (!musicPlayerImgs.includes(each)) {
          uniqueImgs.push(each);
        }
      });

      // console.log(uniqueImgs)

      setMusicPlayerImgs(uniqueImgs);

      // setMusicPlayerImgs((prevState) => [...prevState, ...uniqueImgs]);
      // if ( musicPlayerImgs.filter((each) => each !== musicImages)) {
      //   setMusicPlayerImgs((prevState) => [...prevState, ...musicImages]);
      // }
    } catch (error) {
      console.error(`Error retrieving ${collectionName} data:`, error);
    }
  };

  console.log(musicPlayerImgs);
  useEffect(() => {
    fetchCollectionData("spotifymyAlbumImage", setSpotifyPics);
    fetchCollectionData("spotifymemoriesImage", setMemoryPics);
    fetchCollectionData("spotifythrowBacksImage", setThrowBacksPics);
    fetchCollectionData("spotifymadeForYouImage", setMadeForYouPics);
    fetchCollectionData("spotifyfriendsImage", setFriendsPics);
  }, [clicked]);

  const handleLongPress = (id) => {
    setOptionsShow(true);
    setSelctdID(id);
  };
  const closeOptionss = () => {
    setOptionsShow(false);
  };

  const deletePic = (id, prop) => {
    // console.log(id, prop.collectionName);
    DeleteItem(id, prop, setDeleteAlert);
  };

  const renderItem = ({
    item,
    collectionName,
    MusicScreenData,
    navigation,
  }) => {
    const borderRadius =
      collectionName === "spotifymadeForYouImage" ||
      collectionName === "spotifymemoriesImage"
        ? 6
        : 70;
    console.log(MusicScreenData);
    return (
      <View style={styles.eventsContainer}>
        <TouchableOpacity
          onLongPress={() => handleLongPress(item.id)}
          onPress={() => {
            closeOptionss;
            navigation.navigate("SpotifyMusicScreen", { MusicScreenData });
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 140,
              height: 140,
              borderRadius: borderRadius,
              marginRight: 12,
            }}
            resizeMode="cover"
          />
          {optionsShow && selctdID === item.id && (
            <View style={styles.optionsView}>
              <Button
                title="Remove Pic"
                color={"#E8670E"}
                onPress={() =>
                  deletePic(item.id, { collectionName: collectionName })
                }
              />
            </View>
          )}
        </TouchableOpacity>
        <View>
          <Text style={styles.eventText}>Pavan_Padma💖</Text>
          <Text style={styles.eventText}>Two Years Strong 💑</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainContainer}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            onPress={() => {
              setClicked(!clicked);
            }}
          >
            <View style={styles.albumContainer}>
              <Image
                source={require("../../../assets/p (2).jpeg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 16,
                }}
              />
              <View style={styles.albumTextContainer}>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontSize: 12,
                    color: "#9e9e9e",
                    textAlign: "center",
                  }}
                >
                  #Padma #Pavan #Year Two 💍
                </Text>
                <Text style={styles.celebrityText}>
                  Wedding Wishes 🤩💕
                  </Text>
              </View>
              {/* 
              <TouchableOpacity
               onPress={() => navigation.navigate("SpotifyMusicScreen")}>
              <Ionicons
                name= "play-circle"
                size={30}
                color="white"
              />
            </TouchableOpacity> */}
            </View>
          </TouchableOpacity>

          {spotifyPics.length > 0 ? (
            <FlatList
              data={spotifyPics}
              renderItem={({ item }) =>
                renderItem({
                  item,
                  collectionName: "spotifymyAlbumImage",
                  MusicScreenData: musicPlayerImgs,
                  navigation,
                })
              }
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View style={{display:"flex", flexDirection:"row"}}>
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                marginRight: 12,
                backgroundColor: "#9e9e9e",
              }}
            ></View><View
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              marginRight: 12,
              backgroundColor: "#9e9e9e",
            }}
          ></View></View>
          )}
        </View>

        <View style={styles.categoryContainer}>
          <View style={styles.albumTextContainer}>
            <Text style={styles.categoryText}>Memories</Text>
            {memoryPics.length > 0 ? (
              <FlatList
                data={memoryPics}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    collectionName: "spotifymemoriesImage",
                    MusicScreenData: musicPlayerImgs,
                    navigation,
                  })
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ): <View style={{display:"flex", flexDirection:"row"}}>
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 5,
                marginRight: 12,
                backgroundColor: "#9e9e9e",
              }}
            ></View><View
            style={{
              width: 140,
              height: 140,
              borderRadius: 5,
              marginRight: 12,
              backgroundColor: "#9e9e9e",
            }}
          ></View></View>}
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <View style={styles.albumTextContainer}>
            <Text style={styles.categoryText}>Throw Backs</Text>
            {throwBacksPics.length > 0 && (
              <FlatList
                data={throwBacksPics}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    collectionName: "spotifythrowBacksImage",
                    MusicScreenData: musicPlayerImgs,
                    navigation,
                  })
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <View style={styles.albumTextContainer}>
            <Text style={styles.categoryText}>Made For You</Text>
            {madeForYouPics.length > 0 && (
              <FlatList
                data={madeForYouPics}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    collectionName: "spotifymadeForYouImage",
                    MusicScreenData: musicPlayerImgs,
                    navigation,
                  })
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <View style={styles.albumTextContainer}>
            <Text style={styles.categoryText}>Friends</Text>
            {friendsPics.length > 0 && (
              <FlatList
                data={friendsPics}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    collectionName: "spotifyfriendsImage",
                    MusicScreenData: musicPlayerImgs,
                    navigation,
                  })
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </View>

      <Modal visible={deleteAlert} transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.deletealert}>
            <Ionicons name="cloud-done-outline" size={44} color="black" />
            <Text style={{ fontSize: 18 }}>Deleted successfully !</Text>
            <Button
              title="Refresh"
              color="green"
              onPress={() => {
                setDeleteAlert(false);
                setClicked(!clicked);
              }}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#191414",
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 34,
  },
  albumContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 18,
  },
  albumTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  eventsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 6,
  },
  eventText: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#9e9e9e",
    textAlign: "center",
    width: 120,
  },
  celebrityText: {
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  categoryText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  optionsView: {
    position: "absolute",
    zIndex: 10,
    right: 25,
    bottom: -1,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    width: 120,
    padding: 0,
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
    width: "70%",
    height: undefined,
    aspectRatio: 1.4,
    gap: 25,
  },
});

export default Spotify;
