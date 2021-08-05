const btnTranslate = document.querySelector("#btn-translate")
const userInput = document.querySelector("#userinput")
const output = document.querySelector(".output")
const reset = document.querySelector("#btn-reset")
const serverUrl = "https://api.funtranslations.com/translate/morse.json"
const audioURL = "https://api.funtranslations.com/translate/morse/audio.json";
const music = document.querySelector("audio");
const playBtn = document.getElementById("play");

const getAudioUrl = (text) => {
    return `${audioURL}?text=${text}`;
  };

const getTranslatedUrl =(text) => {
    return `${serverUrl}?text=${text}`
}

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

const errorHandler = (error) =>{
     console.log("Some Error Occurred",error)
     alert("Sorry something went wrong with server! Please try after some time")
}

const resetHandler = () =>{
    userInput.value = ""
    output.innerText= ""
    music.src = "";
    pauseSong();
  }

const audioHandler = () => {
    const textInput = userInput.value;
    fetch(getAudioUrl(textInput))
      .then((response) => response.json())
      .then((json) => {
        let source = json.contents.translated.audio;
        music.src = `data:audio/wav${source.slice(15)}`;
      })
      .catch(errorHandler);
  };

const clickHandler = () =>{
    const textInput = userInput.value

    fetch(getTranslatedUrl(textInput))
    .then(response =>response.json())
    .then(json=>{
        const translatedText = json.contents.translated;
        output.innerText = translatedText
    }).catch(errorHandler)
}
  
btnTranslate.addEventListener("click", () => {
    audioHandler();
    clickHandler();
  });  
reset.addEventListener("click",resetHandler);

