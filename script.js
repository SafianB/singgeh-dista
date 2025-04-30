
// const startingMinutes = 60;
// let time = startingMinutes * 60;

// const countdownEl = document.getElementById('countdown')

// setInterval(updateCountdown, 1000);

// function updateCountdown (){
//     const minutes = Math.floor(time/60);
//     let seconds = time % 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     countdownEl.innerHTML = `${minutes}: ${seconds}`  
//     time--;
// }




// audio
const rootElement = document.querySelector(':root');
const audioIconWrapper = document.querySelector ('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const song = document.querySelector('#song');
let isPlaying = false;



function disableScroll (){
    scrollTop = window.scrollXOffset || document.documentElement.scrollTop;
    scrollLeft = window.scrollYOffset || document.documentElement.scrollLeft;

    window.onscroll = function (){

      window.scrollTo(screenTop, screenLeft);
    }

    
    rootElement.style.scrollBehavior = 'auto';
    
  }


  function enableScroll(){
    window.onscroll = function () { }
    rootElement.style.scrollBehavior = 'smooth';
    // localStorage.setItem('opened','true');
    playAudio ();
  }


  function playAudio(){
    
    song.volume = 0.5;
    audioIconWrapper.style.display = 'flex';
    song.play();
    isPlaying = true;
  }

  audioIconWrapper.onclick = function () {
    if(isPlaying){
        song.pause ();
        audioIcon.classList.remove('bi-disc');
        audioIcon.classList.add('bi-pause-circle');
    } else {
        song.play();
        audioIcon.classList.add('bi-disc');
        audioIcon.classList.remove('bi-pause-circle');
    }

    isPlaying = !isPlaying;
  }

//   if(!localStorage.getItem ('opened')){disableScroll ();}
  disableScroll();



// urlParams

const urlParams = new URLSearchParams (window.location.search);
const nama = urlParams.get('nama') || '';
console.log(nama);
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';


const namaContainer = document.querySelector ('.hero h4 span');
namaContainer.innerText = `${pronoun} ${nama},` .replace(/ ,$/, ',');

document.querySelector('#nama').value = nama;

// konfirmasi
window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        alert("Konfirmasi berhasil!");
      })
    });
  });



// countdown

const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');


const currentYear = new Date().getFullYear();

const newYearTime = new Date (`Juni 18 ${currentYear + 0} 08:00:00`);

setInterval(updateCountdowntime, 1000);

// update Countdown 

function updateCountdowntime (){
    const currentTime = new Date ();
    const diff = newYearTime - currentTime;

    const d = Math.floor (diff / 1000 / 60 / 60 / 24);
    const h = Math.floor (diff / 1000 / 60 / 60) % 24;
    const m = Math.floor (diff / 1000 / 60) % 60;
    const s = Math.floor (diff / 1000) % 60;


 
    console.log(s);
    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h; 
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s; 
}





  

