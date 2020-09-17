import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, AsyncStorage } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import AntIcons from "react-native-vector-icons/AntDesign"
import Slider from "react-native-slider";
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { play, STATE_BUFFERING, useProgress, usePlaybackState } from 'react-native-track-player';
import axios from "axios";


const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height
const initialtrack = {
    "id": "5f57d5f12652d031f8eba",
    "url": "http://192.168.31.74:5000/data/stream/Anne-Marie - Ciao Adio ( )",
    "title": "Song Name",
    "album": "Album",
    "artist": "Artist",
    "img": "https://www.w3.org/TR/SVGTiny12/examples/solidcolor.svg"
}



const BottomTab = () => {
    const navigation = useNavigation();
    const [isplaying, setisplaying] = useState("loading")
    const [data, setdata] = useState(initialtrack)

    const PlaybackState = usePlaybackState();
    const { position, duration, buffered } = useProgress()

   

    // to give track array some data to avoid empty data error
    useEffect(() => {
        // setdata(initialtrack)
        func = async () => {
            const lastsong = JSON.parse(await AsyncStorage.getItem("lastsong"))

            if (lastsong == "undefined") {
                TrackPlayer.reset()
                // TrackPlayer.add(initialtrack)
                setdata(initialtrack)
                // alert("inital")
            } else {
                TrackPlayer.reset()
                TrackPlayer.add([lastsong])
                setdata(lastsong)
                // console.log([lastsong])
                // console.log(lastsong)
            }
        }



        func()
    }, [])

    const track = {
        "id": data.id,
        "url": data.url,
        "title": data.title,
        "album": data.album,
        "artist": data.artist,
        "img": data.img
    }


    useEffect(() => {
        if (position.toFixed(0) == duration.toFixed(0) - 1) {
            setisplaying("paused")
            // alert("stopped")
        }

    }, [position])

    // to loadlast played song on app reopen and also to change track info on search playing instant
    useEffect(() => {
        const trackfunction = async () => {
            const track_Id = await TrackPlayer.getCurrentTrack();
            const trackinfo = await TrackPlayer.getTrack(track_Id)
            const lastsong = JSON.parse(await AsyncStorage.getItem("lastsong"))
            // console.log(lastsong)
            // console.log(trackinfo)
           

            if (track_Id == "undefined") {
                
                TrackPlayer.reset()
                TrackPlayer.add([track]).then(async function () {
                    // console.log(track.title)
                });
                setdata(lastsong)
            } else {
                
                // console.log(trackinfo)
                TrackPlayer.add([track]).then(async function () {
                    // console.log(track.title)
                });
                setdata(trackinfo)

            }

        }
        trackfunction()

        if (PlaybackState == "2") {
            setisplaying("paused")
        } else if (PlaybackState == "3") {
            setisplaying("playing")
        } else {
            setisplaying("buffering")
        }


    }, [PlaybackState])





    const renderplaypause = () => {
        switch (isplaying) {
            case "playing":
                return <Ionicons name={"ios-pause"} size={40} />
            case "paused":
                return <Ionicons name={"ios-play-outline"} size={40} />

            case "buffering":
                return <ActivityIndicator color={"black"} size={40} />
                break;
        }

    }

    const playpause = async () => {
        if (PlaybackState == "2") {
            setisplaying(true)
            await TrackPlayer.play()
            // alert("clicked to play")
        } else if (PlaybackState == "3") {
            setisplaying(false)
            await TrackPlayer.pause()
            // alert("clicked to stop")
        } else if (PlaybackState == "6" || "8") {

        }
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("MusicPlayer")} style={{ bottom: 58, position: "absolute", height: HEIGHT / 12, backgroundColor: "#f6f6f6", overflow: "hidden" }} >
            <Slider minimumValue={0} maximumValue={duration} value={position} trackStyle={{ height: 2 }} thumbStyle={{ height: 0, width: 0, borderRadius: 50, elevation: 1 }} minimumTrackTintColor={"#2bc5b4"} maximumTrackTintColor={"#00FFFF00"} thumbTintColor={"#2bc5b4"} style={{ width: WIDTH.width, height: 3, position: "absolute", backgroundColor: "#f6f6f6" }} />
            <View style={{ bottom: -2, width: WIDTH.width, height: HEIGHT / 13, alignItems: "center", paddingLeft: "1%", borderTopWidth: 0.4, borderTopColor: "silver", flexDirection: "row", borderBottomColor: "silver", borderBottomWidth: 0.5 }} >
                <View style={{ width: WIDTH.width / 8, height: "90%", borderRadius: 2, overflow: "hidden" }}>
                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: track.img }} />
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("MusicPlayer")} style={{ width: WIDTH.width / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#192038", textTransform: "capitalize" }} >{track.title}</Text>
                    <Text style={{ fontSize: 15, color: "silver", textTransform: "capitalize" }} >{track.artist}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={playpause} style={{ width: WIDTH.width / 5.2, height: "90%", justifyContent: "center", alignItems: "center" }}>
                    {renderplaypause()}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    )
}

export default BottomTab;