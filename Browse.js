import React, { Component, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"
import axios from "axios"
import TrackPlayer from "react-native-track-player"
import songs from "./songs"


const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height
import { useIsFocused } from '@react-navigation/native';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}


const Browse = () => {
    
  // TrackPlayer.setupPlayer().then(async()=>{
  //   await TrackPlayer.add(songs)
  //   TrackPlayer.play()
  // })
  
    return (
        
        <View>
              <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
            <Text>Browse Page</Text>
            {/* <TouchableOpacity onPress={()=>TrackPlayer.skipToNext()} >
              <Text>skip</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default Browse;