console.log("hi");

let songIndex=0;
let audioElement = new Audio('songs/.mp3');
let masterplay = document.getElementById("masterplay");
let Progressbar = document.getElementById("Progressbar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let songitem=Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songname: "With You", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songname: "True Stories", filePath: "songs/2.mp3", coverPath: "covers/2.png"},
    {songname: "Excuses", filePath: "songs/3.mp3", coverPath: "covers/3.png"},
    {songname: "Summer High", filePath: "songs/4.mp3", coverPath: "covers/4.png"},
    {songname: "Dil Nu", filePath: "songs/5.mp3", coverPath: "covers/5.png"},
    {songname: "Tere Te", filePath: "songs/6.mp3", coverPath: "covers/6.png"},
    {songname: "Sleepless", filePath: "songs/7.mp3", coverPath: "covers/7.png"},
    {songname: "Insane", filePath: "songs/8.mp3", coverPath: "covers/8.png"},
    {songname: "Brown Munde", filePath: "songs/9.mp3", coverPath: "covers/9.png"},
    {songname: "Arrogant", filePath: "songs/10.mp3", coverPath: "covers/10.png"},
    
]

songitem.forEach((element, i)=>{ 
   
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname; 
})


masterplay.addEventListener('click',()=>{

    if(audioElement.paused || audioElement.currentTime <=0){

        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;

    }else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;

    }
})

audioElement.addEventListener('timeupdate',()=>{

    Progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    Progressbar.value=Progress;
})

Progressbar.addEventListener('change',()=>{

    audioElement.currentTime = Progressbar.value *audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
        
 })

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>9){
        songIndex = 0;

    }else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex>0){
        songIndex = 0;

    }else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');

})

const textToSpeechButton = document.getElementById('text-to-speech-button');

textToSpeechButton.addEventListener('click', () => {
  // Get all of the text on the page
  const text = document.querySelectorAll('*').textContent;

  // Create a new SpeechSynthesisUtterance object
  const message = new SpeechSynthesisUtterance();
  message.text = text;

  // Speak the text
  const speechSynthesis = window.speechSynthesis;
  speechSynthesis.speak(message);
});
