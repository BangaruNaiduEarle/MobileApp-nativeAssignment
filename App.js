import React, { useState, useEffect } from "react";
import OnboardingSlider from "./src/OnboardingSlider";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/Home";
import Youtube from "./src/Pages/Youtube";
import Instagram from "./src/Pages/Instagram";
import WhatsApp from "./src/Pages/WhatsApp";
import WhatsAppChat from "./src/Pages/WhatsAppChat";
import Spotify from "./src/Pages/Spotify";
import Footer from "./src/Footer";
import UploadPics from "./src/Pages/UploadPics";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  FontAwesome6,
  Foundation,
  Entypo,
} from "@expo/vector-icons";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ShortsVideo from "./src/Pages/Youtube/ShortsVideo";
import ProfileScreen from "./src/Pages/ProfileScreen";
import MusicPlayer from "./src/Pages/Spotify/MusicPlayer";
import LottieView from "lottie-react-native";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Youtube">
          <Stack.Screen name="Sliders" component={OnboardingSlider} />

          <Stack.Screen
            name="Youtube"
            component={Youtube}
            options={{
              headerTitle: () => {
                return (
                  <>
                    <Image
                      source={{
                        uri: "https://t3.ftcdn.net/jpg/03/00/38/90/360_F_300389025_b5hgHpjDprTySl8loTqJRMipySb1rO0I.jpg",
                      }}
                      style={{
                        width: 106,
                        height: undefined,
                        aspectRatio: 1.9,
                        // borderWidth: 1,
                        // borderColor: "black",
                      }}
                    /> 
                    
                  </>
                );
              },
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: "700",
                fontFamily: "Roboto",
              },
              headerTitleAlign: "left",
              // headerLeft: () => (
              //   <FontAwesome6 name="youtube" size={24} color="#FF0000" />
              // ),
              headerRight: () => (
                <View style={styles.headerRight}>
                  <MaterialIcons name="cast" size={22} color="black" />
                  <Ionicons
                    name="notifications-outline"
                    size={22}
                    color="black"
                  />
                  <Image
                    source={require("./assets/p (21).jpeg")}
                    // source={{
                    //   uri: "https://firebasestorage.googleapis.com/v0/b/react-native-1-a785d.appspot.com/o/0c71db4b-069f-4c3f-8ca7-0fbbb1f21e53.jpeg?alt=media&token=4e6f5cef-02c0-4ac6-845f-22b1add62135",
                    // }}
                    style={{
                      width: 32,
                      height: 32,
                      objectFit: "fill",
                      borderRadius: 50,
                    }}
                  />
                </View>
              ),
              // headerTintColor: "white", // Customize the color of the header text and icons
              // headerTransparent: true, // Make the header transparent
            }}
          />

          <Stack.Screen
            name="Shorts"
            component={ShortsVideo}
            options={({ navigation }) => ({
              headerTitle: "Shorts",
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: "700",
                fontFamily: "Roboto",
                color: "white",
              },
              headerStyle: {
                backgroundColor: "black",
                alignItems: "center",
              },
              headerTitleAlign: "left",
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginEnd: 14 }}
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name="arrowleft" size={22} color="white" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={styles.headerRightShorts}>
                  <Ionicons name="search" size={22} color="#e0e0e0" />
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={22}
                    color="#e0e0e0"
                  />
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="WhatsApp"
            component={WhatsApp}
            options={{
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#075e54",
              },
              headerTitleAlign: "left",
              headerLeft: () => <Text style={styles.headerLeft}>WhatsApp</Text>,
              headerRight: () => (
                <View style={styles.headerRight}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={22}
                    color="#e0e0e0"
                  />
                  <Ionicons name="search" size={22} color="#e0e0e0" />
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={22}
                    color="#e0e0e0"
                  />
                </View>
              ),
              headerBackButtonMenuEnabled: false,
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="WhatsAppChat"
            component={WhatsAppChat}
            options={({ navigation, route }) => ({
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#075e54",
                height: 56,
              },
              headerTitleAlign: "left",
              headerLeft: () => (
                <View style={styles.leftSection}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("WhatsApp")}
                  >
                    <AntDesign name="arrowleft" size={24} color="white" />
                  </TouchableOpacity>
                  <Image
                    source={require("./assets/whatsAppDp.jpeg")}
                    style={styles.profileImage}
                  />
                  <Text style={styles.friendName}>Bava 💕🥰</Text>
                </View>
              ),
              headerRight: () => (
                <View style={styles.rightSection}>
                  <MaterialCommunityIcons
                    name="video"
                    size={22}
                    color="#e0e0e0"
                    style={styles.icon}
                  />
                  <MaterialCommunityIcons
                    name="phone"
                    size={22}
                    color="#e0e0e0"
                    style={styles.icon}
                  />
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={22}
                    color="#e0e0e0"
                    style={styles.icon}
                  />
                </View>
              ),
              headerBackButtonMenuEnabled: false,
              headerTransparent: false,
            })}
          />

          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={({ navigation, route }) => ({
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#000",
                height: 56,
              },
              headerTitleAlign: "left",
              headerLeft: () => (
                <View style={styles.leftSection}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.reset({ routes: [{ name: "WhatsApp" }] })
                    }
                  >
                    <AntDesign name="arrowleft" size={24} color="white" />
                  </TouchableOpacity>
                  {/* <Image
                    source={require("./assets/seshu pic 1.jpeg")}
                    style={styles.profileImage}
                  /> */}
                  <Text style={styles.friendName}>Bava 💕🥰</Text>
                </View>
              ),
              // headerRight: () => (
              //   <View style={styles.rightSection}>
              //     <MaterialCommunityIcons
              //       name="video"
              //       size={22}
              //       color="#e0e0e0"
              //       style={styles.icon}
              //     />
              //     <MaterialCommunityIcons
              //       name="phone"
              //       size={22}
              //       color="#e0e0e0"
              //       style={styles.icon}
              //     />
              //     <MaterialCommunityIcons
              //       name="dots-vertical"
              //       size={22}
              //       color="#e0e0e0"
              //       style={styles.icon}
              //     />
              //   </View>
              // ),
              headerBackButtonMenuEnabled: false,
              headerTransparent: false,
            })}
          />

          <Stack.Screen
            name="UploadPics"
            component={UploadPics}
            options={{
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#000",
              },
              headerTitleAlign: "left",
              headerLeft: () => (
                <Text style={styles.headerLeft}>Upload Pics</Text>
              ),
              headerRight: () => (
                <View style={styles.headerRight}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={22}
                    color="#e0e0e0"
                  />
                  <Ionicons name="search" size={22} color="#e0e0e0" />
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={22}
                    color="#e0e0e0"
                  />
                </View>
              ),
              headerBackButtonMenuEnabled: false,
              headerTransparent: false,
            }}
          />

          <Stack.Screen
            name="Instagram"
            component={Instagram}
            options={{
              headerTitle: "",

              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTitleStyle: {
                fontSize: 22,
                fontFamily: "Roboto",
                color: "#e0e0e0",
              },
              headerTitleAlign: "left",
              headerLeft: () => {
                return (
                  <View style={styles.headerLeft}>
                    <Image
                      source={require("./assets/instagram.png")}
                      style={{
                        width: 106,
                        height: undefined,
                        aspectRatio: 2.5,
                      }}
                    />
                  </View>
                );
              },
              headerRight: () => (
                <View style={styles.headerRightInsta}>
                  <Ionicons name="heart-outline" size={24} color="black" />
                  <AntDesign name="message1" size={22} color="black" />
                </View>
              ),
              headerBackButtonMenuEnabled: false,
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="Spotify"
            component={Spotify}
            options={{
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#191414",
              },
              headerTitleStyle: {
                fontSize: 22,
                fontFamily: "Roboto",
                color: "#e0e0e0",
              },
              headerTitleAlign: "center",

              headerLeft: () => {
                return (
                  <>
                    <Foundation name="indent-more" size={22} color="#fff" />
                    <View style={styles.headerLeft}>
                      <Image
                        source={require("./assets/Spotify.png")}
                        style={{
                          width: 128,
                          height: undefined,
                          aspectRatio: 3,
                          marginLeft: 90,
                          alignSelf: "center",
                        }}
                      />
                    </View>
                  </>
                );
              },
              headerRight: () => (
                <Ionicons name="search" size={22} color="#e0e0e0" />
              ),
              headerBackButtonMenuEnabled: false,
              headerTransparent: false,
            }}
          />

          <Stack.Screen
            name="SpotifyMusicScreen"
            component={MusicPlayer}
            options={({ navigation }) => ({
              headerTitle: "Padma 🖤 Pavan",
              headerStyle: {
                backgroundColor: "#CA4C31",
              },
              headerTitleStyle: {
                fontSize: 16,
                fontFamily: "Roboto",
                color: "#e0e0e0",
                fontWeight: "bold",
              },
              headerTitleAlign: "center",

              headerLeft: () => {
                return (
                  <>
                    <AntDesign
                      name="down"
                      size={18}
                      color="#e0e0e0"
                      onPress={() => navigation.goBack()}
                    />
                  </>
                );
              },
              headerRight: () => (
                <Entypo name="dots-three-vertical" size={18} color="#e0e0e0" />
              ),
              headerBackButtonMenuEnabled: false,
              headerTransparent: false,
            })}
          />
        </Stack.Navigator>
        <Footer />

        {/* <LottieView
            source={require("./assets/love.json")}
            autoPlay
            loop={true}
            speed={0.7}
            style={{
              position: "absolute",
              width: "100%",
              height: "6%",
              top: '0.5%',
            }}
          />  */}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    width: 120,
    height: 34,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerRightShorts: {
    flexDirection: "row",
    width: 80,
    height: 34,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerRightInsta: {
    flexDirection: "row",
    width: 70,
    height: 34,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    fontSize: 22,
    fontFamily: "Roboto",
    color: "#e0e0e0",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -5,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginLeft: 3,
  },
  friendName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  rightSection: {
    flexDirection: "row",
    marginLeft: "auto", // Push the icons to the right
    marginRight: -20,
  },
  icon: {
    marginHorizontal: 8,
  },
});
