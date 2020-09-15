import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"

const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height

const MyTabBar = ({navigation}) => {
    
    return (
        <>
            <View style={{ height: HEIGHT / 15, backgroundColor: "red" }} >
                <Text>MyTabBar Page</Text>
            </View>
            <View style={{ height: HEIGHT / 13, backgroundColor: "#f6f6f6", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{ justifyContent: "center", alignItems: "center",width:"25%",height:"100%" }} >
                    <Ionicons name={"ios-home-outline"} size={25} color={"black"} />
                    <Text style={{ fontSize: 10 }} >
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigation.navigate("Search")} style={{ justifyContent: "center", alignItems: "center",width:"25%",height:"100%" }}>
                    <Ionicons name={"ios-search-outline"} size={25} color={"black"} />
                    <Text style={{ fontSize: 10 }} >
                        search
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigation.navigate("Browse")} style={{ justifyContent: "center", alignItems: "center",width:"25%",height:"100%" }}>
                    <Ionicons name={"ios-compass-outline"} size={25} color={"black"} />
                    <Text style={{ fontSize: 10 }} >
                        browse
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigation.navigate("Mymusic")} style={{ justifyContent: "center", alignItems: "center",width:"25%",height:"100%" }} >
                    <Ionicons name={"ios-person-outline"} size={25} color={"black"} />
                    <Text style={{ fontSize: 10 }} >
                        Mymusic
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default MyTabBar;