import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Shorts = () => {
  const navigation = useNavigation();

  const data = [
    
    {
      id: "1",
      shortImage:
        "https://firebasestorage.googleapis.com/v0/b/weddingprojectpavan.appspot.com/o/ea6e9d6f-73a9-480f-be8e-eda962123c5d.jpeg?alt=media&token=03ee8cd9-7c54-41d3-b920-5213b73ec96b",
      shortText: "#Hyderabad",
    },
    {
      id: "2",
      shortImage:
        "https://firebasestorage.googleapis.com/v0/b/weddingprojectpavan.appspot.com/o/e7210f20-9d64-4873-b30a-656cdecf20ea.jpeg?alt=media&token=ded4d436-f7ce-4180-bf39-44af29364824",
      shortText: "#Childhood",
    },
    {
      id: "3",
      shortImage:
        "https://firebasestorage.googleapis.com/v0/b/weddingprojectpavan.appspot.com/o/7ac3ffb3-a9d7-439f-a7aa-902292fd49e6.jpeg?alt=media&token=8be97d30-e659-43a0-a49c-153a673413e6",
      shortText: "#wedding shoot",
    },
    {
      id: "4",
      shortImage:
        "https://firebasestorage.googleapis.com/v0/b/weddingprojectpavan.appspot.com/o/4a7ed766-0c0a-4fc5-bc31-358d922f41e6.jpeg?alt=media&token=c7e03206-f3b9-43ed-b577-a730e8a96511",
      shortText: "#wedding shoot",
    },
    {
      id: "5",
      shortImage:
        "https://firebasestorage.googleapis.com/v0/b/weddingprojectpavan.appspot.com/o/3c9d454f-7096-4bbc-84d9-70b7f47524c1.jpeg?alt=media&token=6bd1c2a4-6e1b-4e87-ab05-d37484da0abf",
      shortText: "Pavan",
    },
    {
      id: "6",
      shortImage:
        "https://firebasestorage.googleapis.com/v0/b/weddingprojectpavan.appspot.com/o/81acd96f-7643-4a0e-9d61-2cab0693f811.jpeg?alt=media&token=f9851737-d6f5-483f-988c-8f7f1932ddc8",
      shortText: "Love Birds",
    },
  ];
  
  
  const renderShortImage = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Shorts", { videos: "youtubeVideo" })}
    >
      <View style={styles.ShortsContainer}>
        <View style={styles.Shortscard}>
          <Image
            style={styles.thumbnail}
            source={{ uri: item.shortImage }}
            resizeMode="cover"
          />
          <Text style={styles.description}> {item.shortText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}> Shorts</Text>
        <Entypo name="cross" size={26} color="black" />
      </View>

      <FlatList
        data={data}
        renderItem={renderShortImage}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Shorts;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    height: undefined,
    aspectRatio: 1.3,
  },
  ShortsContainer: {
    flexDirection: "row",
  },
  Shortscard: {
    width: undefined,
    height: "90%",
    aspectRatio: 0.7,
    flexDirection: "column",
    borderRadius: 10,
    padding: 5,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});
