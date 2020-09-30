import React, { Component, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, ImageBackground } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import axios from "axios"
import TrackPlayer, { play, useProgress, usePlaybackState } from 'react-native-track-player';
import songs from "./songs"
import ViewPager from '@react-native-community/viewpager';
import { useIsFocused } from '@react-navigation/native';
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient"
import { ScrollView } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const _ = require("underscore")

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

const initialtrack = {
    id: "5f57d5f12652d031f8eba",
    url: "http://192.168.31.74:5000/data/stream/Anne-Mar- Ciao Adios ( )",
    title: "Song Name",
    album: "Album",
    artist: "Artist",
    img: "https://www.w3.org/TR/SVGTiny12/examples/solidcolor.svg"
}


const VerticalPlayer = () => {

    const PlaybackState = usePlaybackState();
    const { position, duration, buffered } = useProgress()
    const [isplaying, setisplaying] = useState("loading")
    const [data, setdata] = useState(initialtrack)
    const [queue, setqueue] = useState([])

    const changetime = async (seconds) => {
        await TrackPlayer.seekTo(seconds)
    }




    useEffect(() => {
        const trackfunction = async () => {

            const track_Id = await TrackPlayer.getCurrentTrack();
            const trackinfo = await TrackPlayer.getTrack(track_Id)
            const queues = await TrackPlayer.getQueue()


            // var uniquequeue = _.uniq(await TrackPlayer.getQueue(), function (x) {
            //     return x.id;
            // })
            // var  uniquequeue = uniquequeue.filter(id => id.id != 'undefined'); // to remove undifined id object

            setqueue(queues)
            setdata(trackinfo)
            // console.log(queue.length)

            // console.log(trackinfo)




            TrackPlayer.updateOptions({
                stopWithApp: true
            });
        }
        trackfunction()



        if (PlaybackState == "2") {
            setisplaying("paused")
        } else if (PlaybackState == "3") {
            setisplaying("playing")

        } else if (PlaybackState == "6") {
            setisplaying("buffering")
        }



    }, [PlaybackState])

    const renderplaypause = () => {
        switch (isplaying) {
            case "playing":
                return <View >
                    <Icons name="pause" size={20} color="white" />
                </View>
            case "paused":
                return <View  >
                    <Icons name="play" size={20} color="white" />
                </View>

            case "buffering":
                return <ActivityIndicator color={"white"} size={25} />
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
        <>
            <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor="transparent" />


            <ViewPager style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}} orientation={"vertical"} >
            
                    <View key="1" style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}} >
                        <ImageBackground blurRadius={5} style={{ width: "100%", height: "100%", justifyContent: "center", aligndatas: "center" }} source={{ uri: data.img }} >
                            <LinearGradient start={{ x: 0, y: 1.5 }} end={{ x: 0, y: 0 }} colors={['#000000', '#FFFFFF00']} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Image style={{ height: 350, width: 350, borderRadius: 10 }} source={{ uri: data.img }} />
                                <View style={{ width: WIDTH - 35, height: HEIGHT / 10, position: "absolute", bottom: "15%" }} >
                                    <Text style={{ fontSize: 30, fontWeight: "700", color: "white", textTransform: "capitalize" }} > {data.title}</Text>
                                    <Text style={{ fontSize: 18, color: "white", fontWeight: "600", textTransform: "capitalize" }} >  {data.artist}</Text>
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", position: "absolute", bottom: "5%", alignItems: "center", justifyContent: "center" }} >

                                    <View style={{ width: WIDTH, height: HEIGHT / 20, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }} >
                                        <TouchableOpacity onPress={playpause} style={{ left: "25%", height: "100%", justifyContent: "center", alignItems: "center", width: WIDTH * 0.1, paddingTop: "0.5%" }} >
                                            {renderplaypause()}
                                        </TouchableOpacity>

                                        <Slider minimumValue={0} maximumValue={duration} value={position} onValueChange={seconds => changetime(seconds)} trackStyle={{ height: 2 }} thumbStyle={{ height: 5, width: 5, borderRadius: 50, elevation: 1 }} minimumTrackTintColor={"white"} maximumTrackTintColor={"silver"} thumbTintColor={"white"} style={{ width: WIDTH / 1.13, height: 30, position: "absolute", bottom: "6%", left: "10%" }} />


                                    </View>

                                </View>


                            </LinearGradient>
                        </ImageBackground>
                    </View>
             




            </ViewPager>

        </>
    )
}

export default VerticalPlayer;