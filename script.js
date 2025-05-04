
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
namaContainer.innerText = `${pronoun} 
${nama}` .replace(/ ,$/, ',');

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

  // comment
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize storage first
    if (!localStorage.getItem('comments')) {
      localStorage.setItem('comments', JSON.stringify([]));
    }
    // Then load comments
    loadComments();
    
    document.querySelector('.submit-btn').addEventListener('click', function() {
      const name = document.querySelector('.name-input').value.trim();
      const message = document.querySelector('.message-input').value.trim();
      
      if (name && message) {
        addComment(name, message);
        document.querySelector('.name-input').value = '';
        document.querySelector('.message-input').value = '';
      } else {
        alert('Harap isi nama dan ucapan!');
      }
    });
  });

  function addComment(name, message) {
    const comment = {
      name,
      message,
      date: new Date().toLocaleString('id-ID')
    };
    
    // Save to local storage
    const comments = JSON.parse(localStorage.getItem('weddingComments') || '[]');
    comments.unshift(comment); // Add new comment to beginning
    localStorage.setItem('weddingComments', JSON.stringify(comments));
    
    // Refresh display
    loadComments();
  }

  // In your existing code, modify loadComments():
function loadComments(page = 1, commentsPerPage = 3) {
  const allComments = JSON.parse(localStorage.getItem('weddingComments') || []);
  const totalPages = Math.ceil(allComments.length / commentsPerPage);
  const startIdx = (page - 1) * commentsPerPage;
  const paginatedComments = allComments.slice(startIdx, startIdx + commentsPerPage);
  const commentCount = document.querySelector('.comment-count');

  // update comment count
  commentCount.innerHTML = `Total Ucapan: ${allComments.length}`;
  commentCount.style.display = allComments.length > 0 ? 'block' : 'none';

  // Display comments
  document.querySelector('.comments-list').innerHTML = paginatedComments.map(comment => `
    <div class="comment">
      <div class="comment-author">${comment.name}</div>
      <div class="comment-text">${comment.message}</div>
      <div class="comment-date">${comment.date}</div>
    </div>
  `).join('');

  // Add pagination controls
  document.querySelector('.pagination').innerHTML = `
    ${page > 1 ? `<button onclick="loadComments(${page - 1})">Previous</button>` : ''}
    <span>Page ${page} of ${totalPages}</span>
    ${page < totalPages ? `<button onclick="loadComments(${page + 1})">Next</button>` : ''}
  `;


  }
  
  



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





  

