import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ route, navigation }) => {
  const { name, profileImage } = route.params;

  return (
    <View style={styles.container}>
     
      <View style={styles.content}>
        <Image source={profileImage} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  profileImage: {
    width: '100%',
    objectFit:'fill',
    height: undefined,
    aspectRatio:1,
    marginBottom: 0,
    // flex:1,
    // justifyContent: "center"
  },
  
});

export default ProfileScreen;
