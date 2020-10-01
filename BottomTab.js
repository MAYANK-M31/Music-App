import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, AsyncStorage } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import AntIcons from "react-native-vector-icons/AntDesign"
import Slider from "react-native-slider";
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { play, STATE_BUFFERING, useProgress, usePlaybackState, Capability } from 'react-native-track-player';
import axios from "axios";


const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height
var initialtrack = {
    "id": "5f57d5f12652d031f8eba",
    "url": "https://song-streamer.herokuapp.com/data/stream/Anne-Marie - Ciao Adios ( )",
    "title": "Cias Adios",
    "album": "Album",
    "artist": "Anne Maria",
    "img": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Anne-Marie_-_Ciao_Adios.png/220px-Anne-Marie_-_Ciao_Adios.png",
    "artwork": "https://www.wallpaperflare.com/static/326/300/995/kananaskis-sunrise-water-purple-wallpaper.jpg"
}




const BottomTab = () => {
    const navigation = useNavigation();
    const [isplaying, setisplaying] = useState("loading")
    const [data, setdata] = useState(initialtrack)
    const [isready, setisready] = useState(false)

    const PlaybackState = usePlaybackState();
    const { position, duration, buffered } = useProgress()



    // to give track array some data to avoid empty data error
    useEffect(() => {
        // setdata(initialtrack)
        func = async () => {
            const lastsong = JSON.parse(await AsyncStorage.getItem("lastsong"))

            if (lastsong == undefined) {
                // TrackPlayer.reset()
                TrackPlayer.add(initialtrack)
                setdata(initialtrack)
                // console.log("hello");
                // ("inital")
            } else {
                setdata(lastsong)
                setisready(true)
                // TrackPlayer.setupPlayer().then(async () => {
                    // TrackPlayer.reset()
                    await TrackPlayer.add([lastsong])
                    
                // })
                 
                await TrackPlayer.updateOptions({
                    capabilities: [
                        Capability.Play,
                        Capability.Pause,
                        Capability.SkipToNext,
                        Capability.SkipToPrevious,
                    ],
                    
                    stopWithApp:true
                    
                })


                // console.log([lastsong])
                // console.log(lastsong)
            }
        }




        func()
    }, [])

    


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
            

            // const lastsong = JSON.parse(await AsyncStorage.getItem("lastsong"))

            if (lastsong == undefined) {
                setdata(initialtrack)
            }else{
                if (trackinfo) {
                    setdata(trackinfo)
                } else {
                    setdata(lastsong)
                }
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
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("MusicPlayer")} style={{ bottom: 58, position: "absolute", height: 65, backgroundColor: "#f6f6f6", overflow: "hidden" }} >
            <Slider minimumValue={0} maximumValue={duration} value={position} trackStyle={{ height: 2 }} thumbStyle={{ height: 0, width: 0, borderRadius: 50, elevation: 1 }} minimumTrackTintColor={"#2bc5b4"} maximumTrackTintColor={"#00FFFF00"} thumbTintColor={"#2bc5b4"} style={{ width: WIDTH.width, height: 3, position: "absolute", backgroundColor: "#f6f6f6" }} />
            <View style={{ width: WIDTH.width, height: HEIGHT / 13, alignItems: "center", paddingLeft: "1%", borderTopWidth: 0.4, borderTopColor: "silver", flexDirection: "row", borderBottomColor: "silver", borderBottomWidth: 0.5 }} >
                <View style={{ width: 50, height: 50, borderRadius: 2, overflow: "hidden" }}>
                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: data.img }} />
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("MusicPlayer")} style={{ width: WIDTH.width / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#192038", textTransform: "capitalize" }} >{data.title}</Text>
                    <Text style={{ fontSize: 15, color: "silver", textTransform: "capitalize" }} >{data.artist}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={playpause} style={{ width: WIDTH.width / 5.2, height: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden", borderBottomWidth: 0.5, borderBottomColor: "silver" }}>
                    {renderplaypause()}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    )
}

export default BottomTab;