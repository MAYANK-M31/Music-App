import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, AsyncStorage } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ScrollView, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import TrackPlayer, { play, STATE_BUFFERING, useProgress, usePlaybackState } from 'react-native-track-player';
import Slider from "react-native-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableRipple } from "react-native-paper";
import axios from "axios"
import { NavigationActions } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height



const TrendingArtists = (props) => {

    const navigation = useNavigation()

    const [listlength, setlistlenght] = useState(3)
    const [trending, settrending] = useState([])
    const [trendloader, settrendloader] = useState(true)



    // To Shuffle Trending Songs
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array
    }

    useEffect(() => {
        const myfunction = async () => {
            settrendloader(true)
            await axios.get("https://song-streamer.herokuapp.com/data/artist/searchall/")  // Toosie Slide  dolce gabbana
                .then(res => {
                    const a = res.data
                    function renameKey(obj, oldKey, newKey) {
                        obj[newKey] = obj[oldKey];
                        delete obj[oldKey];
                    }
                    a.forEach(a => renameKey(a, '_id', 'id'));
                    settrending(a)
                    settrendloader(false)
                    // console.log(trending)
                })
        }
        myfunction()

    }, [])


    const myfunction = async () => {
        settrendloader(true)
        await axios.get("https://song-streamer.herokuapp.com/data/artist/searchall/")  // Toosie Slide  dolce gabbana
            .then(res => {
                const a = res.data
                function renameKey(obj, oldKey, newKey) {
                    obj[newKey] = obj[oldKey];
                    delete obj[oldKey];
                }
                a.forEach(a => renameKey(a, '_id', 'id'));
                settrending(a)
                settrendloader(false)
                // console.log(trending)
            })
    }
    useEffect(() => {
        myfunction()
    }, [props.reload])


    const play = async (item) => {


        navigation.navigate("ArtistPlaylistHome", { data: item.artist, image: item.image })

    }

    const colorarray = [
        { id: 1, color: "#a0febf" },
        { id: 2, color: "lightpink" },
        { id: 3, color: "#feff7fCC" },
        { id: 4, color: "palegreen" },
        { id: 5, color: "#f4dcdc" },
        { id: 6, color: "#feff7fCC" },
        { id: 7, color: "#a0febf" },
        { id: 8, color: "lightpink" },
        { id: 9, color: "#feff7f" },
        { id: 10, color: "palegreen" },
        { id: 11, color: "#f4dcdc" },
        { id: 12, color: "#feff7fCC" },
        { id: 13, color: "#a0febf" },
        { id: 14, color: "lightpink" },
        { id: 15, color: "#feff7f" },
        { id: 16, color: "palegreen" },
        { id: 17, color: "#f4dcdc" },
        { id: 18, color: "#feff7fCC" },
        { id: 19, color: "#a0febf" },
        { id: 20, color: "lightpink" },


    ]

    return (
        <View style={{ height: 190 }} >




            {trendloader ?
                <FlatList
                    keyboardShouldPersistTaps="always"
                    data={colorarray}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ height: 185, paddingRight: 25, paddingLeft: 10 }}
                    style={{ height: 160 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View>

                                <TouchableOpacity style={{ width: 130, height: 215, marginLeft: 4, overflow: "hidden", padding: 2 }} >
                                    <View style={{ width: "100%", height: "60%", borderRadius: 100,backgroundColor:item.color, overflow: "hidden", borderWidth: 3, borderColor: "white", elevation: 2 }} >
                                       
                                    </View>
                                    <View style={{ width: WIDTH.width / 3, height: 100, alignItems: "center", paddingTop: 8 }} >
                                      
                                    </View>
                                </TouchableOpacity>
                            </View>

                        )
                    }}
                />
                :
                <FlatList
                    keyboardShouldPersistTaps="always"
                    data={trending.slice(0, 10)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ height: 185, paddingRight: 25, paddingLeft: 10 }}
                    style={{ height: 160 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View>

                                <TouchableOpacity onPress={() => play(item)} style={{ width: 130, height: 215, marginLeft: 4, overflow: "hidden", padding: 2 }} >
                                    <View style={{ width: "100%", height: "60%", borderRadius: 100, overflow: "hidden", borderWidth: 3, borderColor: "white", elevation: 2 }} >
                                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.image }} />
                                    </View>
                                    <View style={{ width: WIDTH.width / 3, height: 100, alignItems: "center", paddingTop: 8 }} >
                                        <Text style={{ fontSize: 14, fontWeight: '700', textTransform: "capitalize" }} >{item.artist}</Text>
                                        {/* <Text style={{ fontSize: 12, fontWeight: '700', color: "silver", textTransform: "capitalize" }} >{item.artist}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>

                        )
                    }}
                />
            }














        </View>

    )
}


export default TrendingArtists;