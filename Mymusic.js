import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image,StatusBar } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"


const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height

const Mymusic = ()=>{
    return(
        <View>
            <Text>Mymusic Page</Text>
        </View>
    )
}

export default Mymusic;