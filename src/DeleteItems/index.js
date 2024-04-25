import { View, Text } from "react-native";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const DeleteItem = async (id, prop, setDeleteAlert) => {
  // console.log(prop.collectionName)
  try {
    const resp = await deleteDoc(doc(db, prop.collectionName, id));
    setDeleteAlert(true);
    // console.log(resp);
  } catch (err) {
    console.log(err);
  }
};
