import React, { Component, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, FlatList, ScrollView, ImageBackground } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign"
import axios from "axios"
import TrackPlayer from "react-native-track-player"
import { TouchableRipple } from "react-native-paper"
import Icons from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import LinearGradient from "react-native-linear-gradient"


const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height



const ArtistPlaylist = ({route}) => {
    
    const [result, setresult] = useState([])

    useEffect(() => {
        fetchfunc = async () => {
            await axios.get("http://192.168.31.74:5000/data/" + `${route.params.data}`.toLowerCase())  // Toosie Slide  dolce gabbana
                .then(async res => {
                    const data = res.data
                    function renameKey(obj, oldKey, newKey) {
                        obj[newKey] = obj[oldKey];
                        delete obj[oldKey];
                    }
                    data.forEach(data => renameKey(data, '_id', 'id'));
                    setresult(data)
                
                    await TrackPlayer.add(data)
                    
        
                })

        }
        fetchfunc()
    }, [])

     
    const play= async(item) =>{
        
        TrackPlayer.skip(item.id)
        TrackPlayer.play()

    }

    const playall = async()=>{
    
        TrackPlayer.skip(result[0].id)
        TrackPlayer.play()
    }




    return (
        <View style={{ backgroundColor: "#f6f6f6" }}  >
            <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
            <ScrollView showsVerticalScrollIndicator={false} >


                <ImageBackground style={{ height: HEIGHT * 0.4 }}
                    source={{ uri: `${route.params.image}` }}
                >
                    
                    <LinearGradient start={{ x: 0, y: 2 }} end={{ x: 0, y: 0 }} colors={['#000000', '#FFFFFF00']} style={{ height: "50%", width: "100%", bottom:0,position:"absolute", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 30, color: "white", fontWeight: "700",textTransform:"capitalize" }} >{route.params.data}</Text >
                        <Text style={{ fontSize: 13, color: "white", fontWeight: "100" }} >2.5M Followers | 305M+ Plays</Text >
                    </LinearGradient>

                </ImageBackground>

                <View style={{ height: HEIGHT * 0.6 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative", top: -HEIGHT / 19 / 2 }} >
                        <View style={{ backgroundColor: "#FFFFFFFA", height: HEIGHT / 19, width: WIDTH / 3, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "black" }}>
                            <Text style={{ fontSize: 15, fontWeight: "700" }} >Follow | 2.5M</Text >
                        </View>
                        <View style={{ height: HEIGHT / 20, width: WIDTH / 40 }} >

                        </View>
                        <TouchableOpacity activeOpacity={0.9} onPress={()=>playall()} style={{ backgroundColor: "#2bc5b4", height: HEIGHT / 19, width: WIDTH / 3, borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 15, fontWeight: "700", color: "white" }} >Play All</Text >
                        </TouchableOpacity>

                    </View>

                    <View style={{ width: "50%", paddingLeft: "5%" }}>
                        <Text style={{ fontSize: 18, fontWeight: "700" }} >Top Songs</Text>
                    </View>


                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={result}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ width: WIDTH, top: "2%", justifyContent: "center", alignItems: "center" }} >
                                    <TouchableRipple onPress={()=>play(item)} rippleColor="rgba(0, 0, 0, 0.15)" style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >
                                        <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "25%" }} >
                                            <View style={{ width: WIDTH / 8, height: "90%", borderRadius: 6, overflow: "hidden" }}>
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                            </View>
                                            <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                                <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize" }} >{item.title}</Text>
                                                <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist} - {item.title}</Text>
                                            </View>
                                            <View style={{ width: WIDTH / 5.2, height: "90%", justifyContent: "center", alignItems: "center" }}>
                                                <Icons name={'dots-three-vertical'} color={"grey"} size={20} />
                                            </View>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            )
                        }}
                    />


                </View>
            </ScrollView>

        </View>
    )
}

export default ArtistPlaylist;