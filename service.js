import TrackPlayer from "react-native-track-player"

module.exports = async function() {

    TrackPlayer.addEventListener("remote-play",  (event) => {
        TrackPlayer.play();
    });
    
    TrackPlayer.addEventListener("remote-pause",  (event) => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    
    
};