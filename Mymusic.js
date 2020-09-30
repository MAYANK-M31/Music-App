import React, { Component, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"
import axios from "axios"
import TrackPlayer from "react-native-track-player"
import songs from "./songs"
import LottieView from "lottie-react-native"

const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";


function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}


const Mymusic = () => {
    
  // TrackPlayer.setupPlayer().then(async()=>{
  //   await TrackPlayer.add(songs)
  //   TrackPlayer.play()
  // })
  
    return (
        
        <SafeAreaView style={{justifyContent:'center',alignItems:"center",height:HEIGHT,backgroundColor:"#f6f6f6"}} >
              <FocusAwareStatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <LottieView style={{height:250,width:250}} source={require('./animations/27330-construction-in-process-by-kit8net.json')} autoPlay loop />
            <Text style={{ fontSize: 22,fontWeight:"700",top:20 }}>Under Construction...</Text>
        </SafeAreaView>
    )
}

export default Mymusic;