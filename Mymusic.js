import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image,StatusBar } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"
import { useIsFocused } from '@react-navigation/native';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height

const Mymusic = ()=>{
    return(
        <View>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
            <Text>Mymusic Page</Text>
        </View>
    )
}

export default Mymusic;