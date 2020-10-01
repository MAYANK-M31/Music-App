import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, ImageBackground } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import AntIcons from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import Slider from "@react-native-community/slider";
import TrackPlayer, { play, useProgress, usePlaybackState,Capability } from 'react-native-track-player';
import Moment from "moment";
import axios from "axios"
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient"
import { ScrollView } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height


function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}


const initialtrack = {
    id: "5f57d5f12652d031f8eba",
    url: "https://song-streamer.herokuapp.com/data/stream/Anne-Marie - Ciao Adios ( )",
    title: "Song Name",
    album: "Album",
    artist: "Artist",
    img: "https://www.w3.org/TR/SVGTiny12/examples/solidcolor.svg"
}

const MusicPlayer = ({ navigation }) => {
    const PlaybackState = usePlaybackState();
    const { position, duration, buffered } = useProgress()
    const [isplaying, setisplaying] = useState("loading")
    const [data, setdata] = useState(initialtrack)


    //TO SKIP MUSIC 10 SECONDS BY PRESSING DUMMY BUTTON
    const seek = async () => {
        const position = await TrackPlayer.getPosition()
        TrackPlayer.seekTo(position + 10);
    }


    //SEEKING BY SLIDING SLIDER

    const changetime = async (seconds) => {
        await TrackPlayer.seekTo(seconds)
    }





    // IMPORTANT STATE KNOWN DATA ---------------------------
    // STATE_READY = 2
    // STATE_NONE = 0
    //  STATE_PLAYING = 3
    // STATE_PAUSED = 2
    // STATE_STOPPED = 1
    // STATE_BUFFERING = 6 
    // STATE_CONNECTING = 8


    useEffect(() => {
        const func = async () => {
            if (position.toFixed(0) == duration.toFixed(0) - 1) {
                TrackPlayer.skipToNext()
            }
        }
        func()

    }, [position])

    useEffect(() => {
        const trackfunction = async () => {
            const track_Id = await TrackPlayer.getCurrentTrack();
            const trackinfo = await TrackPlayer.getTrack(track_Id)
            setdata(trackinfo)
            // console.log(trackinfo)
            // console.log(trackinfo)

            



            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
                
                stopWithApp:true
                
            })
            // console.log((await TrackPlayer.getQueue()).length)
        }
        trackfunction()

        // if (position == duration-1){
        //     alert("paused")
        // }

        if (PlaybackState == "2") {
            setisplaying("paused")
        } else if (PlaybackState == "3") {
            setisplaying("playing")

        } else{
            setisplaying("buffering")
        }

        // console.log(PlaybackState)
        // console.log(Moment.utc(duration * 1000).format("m:ss"))

    }, [PlaybackState])


    const renderplaypause = () => {
        switch (isplaying) {
            case "playing":
                return <View style={{ width: 70, alignItems: "center", height: 50 }} >
                    <Icons name="pause" size={45} color="#192038" />
                </View>
            case "paused":
                return <View style={{ width: 70, alignItems: "center" }} >
                    <Icons name="play" size={45} color="#192038" />
                </View>

            case "buffering":
                return <ActivityIndicator color={"#192038"} size={45} />
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

    const next = async () => {


        TrackPlayer.skipToNext()
        TrackPlayer.play()
        // const track_Id = await TrackPlayer.getCurrentTrack();
        // console.log(await TrackPlayer.getQueue())


    }

    const previous = async () => {
        TrackPlayer.skipToPrevious()
    }

    //--------------------------------------------END-------------------------------------------------------------



    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "#f6f6f6" }} >
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="black" />
            <View style={{ flex: 1, alignItems: "center", backgroundColor: "#f6f6f6" }} >
               


                    <View style={{ width: WIDTH.width, height: HEIGHT / 15, justifyContent: "center", borderBottomWidth: 0.4, borderColor: 'silver' }} >

                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "15%", alignItems: "center" }} >
                            <Ionicons name={"ios-close-outline"} color={"#192038"} size={38} />
                        </TouchableOpacity>
                    </View>
                  
                    <StatusBar backgroundColor={"#f6f6f6"} barStyle={"dark-content"} />
                    <View style={{ flex: 1, width: WIDTH.width, justifyContent: "center", alignItems: "center" }} >

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} decelerationRate={"fast"} snapToInterval={WIDTH.width/1.18} snapToAlignment={"center"}  contentContainerStyle={{justifyContent:"center",alignItems:"center",paddingRight:10,paddingLeft:25}} >
                            <View style={{ width: WIDTH.width / 1.2 ,height:WIDTH.width / 1.2,marginRight:15, backgroundColor: "silver", elevation: 1, borderRadius: 10, overflow: "hidden", elevation: 10 }} >
                                <Image style={{ width: "100%", height: "100%" }}
                                    source={{ uri: data.img }}
                                />
                            </View>
                            <View style={{ width: WIDTH.width / 1.2 ,height: WIDTH.width / 1.2,marginRight:15, backgroundColor: "silver", elevation: 1, borderRadius: 10, overflow: "hidden", elevation: 10 }} >
                                <Image style={{ width: "100%", height: "100%" }}
                                    source={{ uri: data.img }}
                                />
                            </View>
                            <View style={{ width: WIDTH.width / 1.2 ,height: WIDTH.width / 1.2,marginRight:15, backgroundColor: "silver", elevation: 1, borderRadius: 10, overflow: "hidden", elevation: 10 }} >
                                <Image style={{ width: "100%", height: "100%" }}
                                    source={{ uri: data.img }}
                                />
                            </View>
                         
                        </ScrollView>

                        {/* <View style={{ width: WIDTH.width / 1.2, height: HEIGHT / 2.2, backgroundColor: "#192038", elevation: 1, borderRadius: 20, overflow: "hidden", elevation: 10 }} >
                            <Image style={{ width: "100%", height: "100%" }}
                                source={{ uri: data.img }}
                            />
                        </View> */}

                    </View>

                    <View style={{ flex: 0.178, width: WIDTH.width - 35, height: HEIGHT / 10, }} >
                        <Text style={{ fontSize: 30, fontWeight: "700", color: "#192038", textTransform: "capitalize" }} > {data.title}</Text>
                        <Text style={{ fontSize: 18, color: "silver", fontWeight: "600", textTransform: "capitalize" }} >  {data.artist}</Text>
                    </View>

                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center", bottom: "2%" }} >
                        <View>
                            <View>
                                <Slider minimumValue={0} maximumValue={duration} value={buffered} thumbTintColor={"#00FFFF00"} minimumTrackTintColor={"silver"} maximumTrackTintColor={"lightgrey"} style={{ width: WIDTH.width - 35, height: 30 }} />
                            </View>
                            <Slider minimumValue={0} maximumValue={duration} value={position} onValueChange={seconds => changetime(seconds)} trackStyle={{ height: 3 }} thumbStyle={{ height: 10, width: 10, borderRadius: 50, elevation: 1 }} minimumTrackTintColor={"#2bc5b4"} maximumTrackTintColor={"#00FFFF00"} thumbTintColor={"#2bc5b4"} style={{ width: WIDTH.width - 35, height: 30, position: "absolute" }} />

                            <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                                <Text style={{ fontSize: 12, color: "grey", left: "100%" }} >
                                    {Moment.utc(position * 1000).format("m:ss")}
                                </Text>
                                <Text style={{ fontSize: 12, color: "grey", right: "100%" }} >
                                    {Moment.utc(duration * 1000).format("m:ss")}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", width: WIDTH.width / 2, alignItems: "center", height: 50 }} >

                            <TouchableOpacity onPress={() => previous()} >
                                <AntIcons name="stepbackward" size={35} color="#192038" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={playpause} activeOpacity={0.9} >
                                {renderplaypause()}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => next()} >
                                <AntIcons name="stepforward" size={35} color="#192038" />
                            </TouchableOpacity>


                        </View>
                    </View>
   
            </View>
        </SafeAreaView>
    )

}

export default MusicPlayer;