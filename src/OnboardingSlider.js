// OnboardingSlider.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: 1,
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("../assets/tree.jpg"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../assets/tree.jpg"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../assets/tree.jpg"),
    backgroundColor: "#22bcb5",
  },
];

export default function OnboardingSlider() {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.titles}>{item.title}</Text>
        <Image source={item.image} style={{ width: "70%", height: "70%" }} />
        <Text>{item.text}</Text>
      </View>
    );
  };

  //   const onDone = () => {
  //     showRealAppFn();
  //   };

  return (
    <>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={() => navigation.navigate("Home")}
      />
      {/* <Button title="back" onPress={showRealAppFn} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  slide: {
    display: "flex",

    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  titles: {
    color: "red",
    fontWeight: "800",
    fontSize: 18,
  },
});
