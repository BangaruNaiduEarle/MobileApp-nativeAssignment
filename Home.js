// Home.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image,Button } from "react-native";

export default function Home({ showRealAppFn }) {
  // console.log("my first android app");
  return (
    <View style={styles.container}>
      <View
        style={{ borderWidth: 1, height: 500, width: 300, borderColor: "#000" }}
      >
        <Text style={{ textAlign: "center" }}>Jai Ganesha</Text>
        <Image
          source={{
            uri: "https://1.bp.blogspot.com/-7OfgHL1iZXk/W5i27xJeE2I/AAAAAAAAYGY/gu0w17_h1CMq_oaXYh97ImjYJwsqI1_6gCLcBGAs/s400/Vinayaka%2B2.png",
          }}
          style={{ width: "100%", height: 400 }}
        />
      </View>
      <Text>welcome to mobile app</Text>
      <Text>Published our App successfully on 8-3-34</Text>
      <View>
        <Button title="Go to slides" onPress={showRealAppFn} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
