import React, { Component, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"
import axios from "axios"
import TrackPlayer from "react-native-track-player"
// import songs from "./songs"
const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height
const songs = {
    id: "1",
    album: "Graveyard",
    artist: "Halsey",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Halsey_-_Graveyard.png/220px-Halsey_-_Graveyard.png",
    title: "Graveyard",
    url: "Halsey - Graveyard"
}
const Browse = () => {
    // useEffect(() => {
    //     myfunc = async () => {
    //         // await axios.get("http://192.168.31.74:5000/data/" + `halsey`.toLowerCase())  // Toosie Slide  dolce gabbana
    //         //     .then(async res => {
    //         //         console.log(res.data[1])
    //         //         await TrackPlayer.reset()
    //         //         TrackPlayer.setupPlayer().then(async()=>{
    //         //             await TrackPlayer.add(res.data[1]).then(() => {
    //         //                 console.log(res.data[1].title)
    //         //             })
    //         //             await TrackPlayer.play()
    //         //         })



    //         //     })

    //     }
    //     // myfunc()
    //     TrackPlayer.setupPlayer().then(async () => {
    //         console.log("player ready")
    //         TrackPlayer.reset()
    //         await TrackPlayer.add([songs])
    //         console.log(songs.title)
    //         TrackPlayer.play()
    //     })
    // }, [])
    return (
        <View>
            <Text>Browse Page</Text>
        </View>
    )
}

export default Browse;