const songs = [
    {
        title:"Another Medium",
        game:"Undertale / Toby Fox",
        file:"music/AnotherMedium.ogg",
        image:"images/undertale.jpg"
    },
    {
        title:"Here We Are",
        game:"Undertale / Toby Fox",
        file:"music/HereWeAre.ogg",
        image:"images/undertale.jpg"
    },
    {
        title:"Hotel",
        game:"Undertale / Toby Fox",
        file:"music/Hotel.ogg",
        image:"images/undertale.jpg"
    },
    {
        title:"Uwa!! So Temperate",
        game:"Undertale / Toby Fox",
        file:"music/UwaSoTemperate.ogg",
        image:"images/undertale.jpg"
    },
    {
        title:"sans.",
        game:"Undertale / Toby Fox",
        file:"music/sans.ogg",
        image:"images/undertale.jpg"
    },
    {
        title:"My Castle Town",
        game:"Deltarune ch1 / Toby Fox",
        file:"music/castletown.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"TV Time!",
        game:"Deltarune ch3 / Toby Fox",
        file:"music/tvtime.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"Dark Sanctuary",
        game:"Deltarune ch4 / Toby Fox",
        file:"music/ch4_credits.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"Festival",
        game:"Deltarune ch5 / Toby Fox",
        file:"music/festival.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"Welcome to the Green Room",
        game:"Deltarune ch3 / Toby Fox",
        file:"music/greenroo_detune.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"Hip Shop",
        game:"Deltarune ch1 / Toby Fox",
        file:"music/hip_shop.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"The Place Where It Rained",
        game:"Deltarune ch4 / Toby Fox",
        file:"music/rain.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"Lantern",
        game:"Deltarune ch1 / Toby Fox",
        file:"music/shop1.ogg",
        image:"images/deltarune.png"
    },
    {
        title:"TV World",
        game:"Deltarune ch3 / Toby Fox",
        file:"music/tv_world.ogg",
        image:"images/deltarune.png"
    }
];


const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const game = document.getElementById("gameTitle");
const art = document.getElementById("albumArt");
const button = document.getElementById("playButton");

const skipButton = document.getElementById("skipButton");
const progress = document.getElementById("progress");
const current = document.getElementById("currentTime");
const duration = document.getElementById("duration");


let currentSong;
let lastSong = -1;

function loadRandomSong(){

    let newSong;

    do {
        newSong = Math.floor(Math.random() * songs.length);
    }
    while(newSong === lastSong);

    lastSong = newSong;

    currentSong = songs[newSong];

    audio.src = currentSong.file;

    title.textContent = currentSong.title;
    game.textContent = currentSong.game;
    art.src = currentSong.image;
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

skipButton.onclick = () => {

    audio.pause();

    loadRandomSong();

    audio.currentTime = 0;

    audio.play();

    button.textContent = "⏸ Pause";

};

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percent =
        (audio.currentTime / audio.duration) * 100;

    progress.style.width = percent + "%";

    current.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


function formatTime(seconds){

    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);

    const secondsLeft =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secondsLeft}`;

}

audio.onended = () => {
    loadRandomSong();
    audio.play();
};

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
window.addEventListener("pagehide", () => {
    audio.pause();
    audio.currentTime = 0;
});
