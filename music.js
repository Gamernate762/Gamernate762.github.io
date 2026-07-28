const songs = [
    {
        title:"Hopes and Dreams",
        game:"Undertale",
        file:"music/hopes_and_dreams.mp3",
        image:"images/undertale.png"
    },
    {
        title:"Field of Hopes and Dreams",
        game:"Deltarune",
        file:"music/field_of_hopes.mp3",
        image:"images/deltarune.png"
    },
    {
        title:"Sweden",
        game:"Minecraft",
        file:"music/sweden.mp3",
        image:"images/minecraft.png"
    }
];


const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const game = document.getElementById("gameTitle");
const art = document.getElementById("albumArt");
const button = document.getElementById("playButton");

let currentSong;


function loadRandomSong(){

    currentSong =
    songs[Math.floor(Math.random()*songs.length)];

    audio.src=currentSong.file;

    title.textContent=currentSong.title;
    game.textContent=currentSong.game;
    art.src=currentSong.image;

}


button.onclick = () => {

    if(audio.paused){
        audio.play();
        button.textContent="⏸ Pause";
    }
    else{
        audio.pause();
        button.textContent="▶ Play";
    }

};


audio.onended = loadRandomSong;


loadRandomSong();

// Stop music when leaving the page
window.addEventListener("beforeunload", () => {
    audio.pause();
    audio.currentTime = 0;
});

// Stop music when clicking links
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        audio.pause();
        audio.currentTime = 0;
    });
});
