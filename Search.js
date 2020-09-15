import React, { Component, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, Image, StatusBar, Keyboard, AsyncStorage } from "react-native";
import Icons from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player"
import { TouchableRipple } from "react-native-paper"

var _ = require('underscore');

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
const Search = () => {
    const [result, setresult] = useState("");
    const [data, setdata] = useState([])
    const [found, setfound] = useState(null)
    const [loading, setloading] = useState(false)
    const [playbutton, setplaybutton] = useState()
    const [array, setarray] = useState([])
    const [recent, setrecent] = useState([])
    const [history, sethistory] = useState(false)


    const search = async (data) => {
        setloading(true)
        sethistory(false)
        if (data === "") {  /// To avoid showing no result found on  backpress inputbox
            setfound(true)
            setloading(false)
            historyfuction()
        }

        await axios.get("http://192.168.31.74:5000/data/" + `${data}`.toLowerCase())  // Toosie Slide  dolce gabbana
            .then(res => {
                const a = res.data
                function renameKey(obj, oldKey, newKey) {
                    obj[newKey] = obj[oldKey];
                    delete obj[oldKey];
                }
                a.forEach(a => renameKey(a, '_id', 'id'));
                // console.log(a)
                setresult(a)
                setfound(true)
                setloading(false)
                // console.log(result)
                if (res.data == "") {
                    setfound(false)
                } else {
                    setfound(true)
                }


            })
    }


    useEffect(() => {
        historyfuction = async () => {
            const value = await AsyncStorage.getItem("history")
            if (value === null) {
                sethistory(false)
            } else {
                sethistory(true)
                // console.log(value)
                // await AsyncStorage.removeItem("history")
                setrecent(JSON.parse(value))
                setarray(JSON.parse(await AsyncStorage.getItem("history")))
            }


        }
        historyfuction()
    }, [])




    const play = async (item) => {
        Keyboard.dismiss()
        setplaybutton()
        setdata(item)

        await AsyncStorage.setItem("lastsong", JSON.stringify(item))

        if (_.findWhere(array, item) == null) {
            array.push(item);
            await AsyncStorage.setItem("history", JSON.stringify(array))
            // console.log("unique added")
        } else {
            // console.log("same")
        }



        const track = {
            "id": item.id,
            "url": item.url,
            "title": item.title,
            "album": item.album,
            "artist": item.artist,
            "img": item.img
        }
        TrackPlayer.reset()
       
        TrackPlayer.add([track]).then(async function () {
            await TrackPlayer.play()
            // console.log(await TrackPlayer.getCurrentTrack())
        });





        const current_track = await TrackPlayer.getCurrentTrack()
        if (current_track == item.id) {

            setplaybutton(current_track) //#2bc5b4
        } else {
            setplaybutton("ihc aj")
        }


        // await axios.get("http://192.168.31.74:5000/data/" + `${item.artist}`.toLowerCase())  // Toosie Slide  dolce gabbana
        // .then(res => {
        //      console.log(res.data)
        //      TrackPlayer.reset()
        //      TrackPlayer.add(res.data)
        //      TrackPlayer.play()
        // })
    }


    const remove = async (item) => {


        const deletearray = _.without(array, _.findWhere(array, item));
        setarray(deletearray)
        await AsyncStorage.setItem("history", JSON.stringify(deletearray))
        setrecent(deletearray)


        if (array.length <= 1) {
            // alert(array.length)
            sethistory(false)
            await AsyncStorage.removeItem("history")

        }




    }


    return (
        <View style={{ backgroundColor: "#f6f6f6", flex: 1 }} >
            <StatusBar backgroundColor={"#f6f6f6"} barStyle={"dark-content"} />
            <View style={{ width: WIDTH, alignItems: "center", top: 0, height: HEIGHT / 10, justifyContent: "center" }} >
                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-evenly", overflow: "hidden", backgroundColor: "white", alignItems: "center", borderRadius: 5, elevation: 0.2, borderColor: "silver", borderWidth: 0.3 }} >
                    {loading ?
                        <View style={{ width: WIDTH / 12 }} >
                            <ActivityIndicator size={25} color={"grey"} />
                        </View >

                        :
                        <View style={{ width: WIDTH / 12, alignItems: "center" }} >
                            <Ionicons name={"search"} style={{ left: "10%" }} color={"grey"} size={25} />
                        </View>
                    }


                    <TextInput
                        value={search}
                        onChangeText={data => search(data)}
                        autoFocus={true}
                        autoCapitalize={"words"}
                        placeholder=" Music, Artist and Albums" placeholderTextColor="silver" style={{ backgroundColor: "white", fontSize: 17, width: "90%", height: HEIGHT / 16, color: "#303846" }}
                    />
                </View>

            </View>

            {history ?
                <View>
                    <View style={{ width: WIDTH, height: HEIGHT / 22, flexDirection: "row", justifyContent: "space-between" }} >

                        <View style={{ width: "50%", paddingLeft: "5%" }}>
                            <Text style={{ fontSize: 22 }} >Recent Searches</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.9} onPress={async () => { await AsyncStorage.removeItem("history"), sethistory(false), setarray([]) }} style={{ width: "50%", alignItems: "flex-end", paddingRight: "5%", paddingTop: "2%" }} >
                            <Text style={{ color: "#2bc5b4", fontWeight: "bold" }} >Clear</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView keyboardShouldPersistTaps={"always"} style={{ height: HEIGHT / 1.25 }} >
                        {recent.map((item) =>

                            <TouchableRipple rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => play(item)} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >

                                <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "25%" }} >
                                    <View style={{ width: WIDTH / 8, height: "90%", borderRadius: 6, overflow: "hidden" }}>
                                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                    </View>
                                    <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                        <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize", color: " #192038", fontFamily: "OpenSans" }} >{item.title}</Text>
                                        <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
                                    </View>
                                    <View style={{ width: WIDTH / 5.2, height: "90%", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                        <TouchableOpacity onPress={() => remove(item)} activeOpacity={0.9} style={{ width: "40%", height: "60%", backgroundColor: "white", borderRadius: 50, justifyContent: "center", alignItems: "center", bottom: "10%", elevation: 2, overflow: "hidden" }}  >
                                            <Icons name={'cross'} color={"grey"} size={20} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </TouchableRipple>

                        )}
                    </ScrollView>


                </View> :
                found ?
                    <ScrollView keyboardShouldPersistTaps="always"   >
                        <View style={{ width: WIDTH, left: "5%", height: HEIGHT / 25 }} >
                            {found ?
                                <Text style={{ fontSize: 22 }} >Result</Text>
                                :
                                null
                            }
                        </View>
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            data={result}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (

                                    <View style={{ width: WIDTH, top: "2%", justifyContent: "center", alignItems: "center" }} >
                                        <TouchableRipple rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => play(item)} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >

                                            <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "25%" }} >
                                                <View style={{ width: WIDTH / 8, height: "90%", borderRadius: 6, overflow: "hidden" }}>
                                                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                                </View>
                                                <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize", color: playbutton == item.id ? "#2bc5b4" : " #192038" }} >{item.title}</Text>
                                                    <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
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
                    </ScrollView>
                    :
                    <View style={{ width: WIDTH, height: HEIGHT, top: WIDTH / 2, alignItems: "center" }} >
                        <Text style={{ fontSize: 22 }}>Oops!</Text>
                        <Text style={{ fontSize: 22 }}>No Result Found</Text>
                    </View>


            }









        </View>

    )
}

export default Search;