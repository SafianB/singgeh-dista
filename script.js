
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

  // Comments section
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize comments array in localStorage if it doesn't exist
    if (!localStorage.getItem('comments')) {
        localStorage.setItem('comments', JSON.stringify([]));
    }

    // DOM elements
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const submitButton = document.getElementById('submitComment');
    const commentsContainer = document.getElementById('commentsContainer');
    const commentCountElement = document.getElementById('commentCount');
    const paginationElement = document.getElementById('pagination');

    // Pagination variables
    const commentsPerPage = 3;
    let currentPage = 1;

    // Load and display comments
    function loadComments(page = 1) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentCountElement.textContent = `${comments.length} Comments`;

        // Calculate pagination
        const totalPages = Math.ceil(comments.length / commentsPerPage);
        currentPage = Math.min(page, totalPages);
        
        // Display comments for current page
        const startIndex = (currentPage - 1) * commentsPerPage;
        const endIndex = startIndex + commentsPerPage;
        const commentsToShow = comments.slice(startIndex, endIndex).reverse(); // Show newest first

        commentsContainer.innerHTML = '';
        
        if (commentsToShow.length === 0) {
            commentsContainer.innerHTML = '<p>Belum ada ucapan. Jadilah yang pertama!</p>';
        } else {
            commentsToShow.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                
                const timeAgo = formatTimeAgo(comment.timestamp);
                
                commentElement.innerHTML = `
                    <div class="comment-author">${comment.name}</div>
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-date">${timeAgo}</div>
                `;
                
                commentsContainer.appendChild(commentElement);
            });
        }

        // Update pagination buttons
        updatePaginationButtons(totalPages);
    }

    // Format timestamp as "X time ago"
    function formatTimeAgo(timestamp) {
        const now = new Date();
        const commentDate = new Date(timestamp);
        const seconds = Math.floor((now - commentDate) / 1000);
        
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return `${interval} tahun lalu`;
        
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return `${interval} bulan lalu`;
        
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return `${interval} hari lalu`;
        
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return `${interval} jam lalu`;
        
        interval = Math.floor(seconds / 60);
        if (interval >= 1) return `${interval} menit lalu`;
        
        return `${Math.floor(seconds)} detik lalu`;
    }

    // Update pagination buttons
    function updatePaginationButtons(totalPages) {
        paginationElement.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Sebelumnya';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            loadComments(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationElement.appendChild(prevButton);
        
        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                loadComments(i);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationElement.appendChild(pageButton);
        }
        
        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Selanjutnya';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            loadComments(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationElement.appendChild(nextButton);
    }

    // Handle form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const commentText = commentInput.value.trim();
        
        if (name === '' || commentText === '') {
            alert('Nama dan ucapan harus diisi!');
            return;
        }
        
        // Get existing comments
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        
        // Add new comment
        const newComment = {
            name: name,
            text: commentText,
            timestamp: new Date().toISOString()
        };
        
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        
        // Clear form
        nameInput.value = '';
        commentInput.value = '';
        
        // Reload comments (show first page)
        loadComments(1);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial load
    loadComments();
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





  

