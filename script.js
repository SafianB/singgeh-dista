
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
// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Load comments from localStorage when the page loads
  loadComments();

  // Handle comment submission
  document.getElementById('commentForm').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission

      // Get the username and comment from the inputs
      const usernameInput = document.getElementById('usernameInput');
      const commentInput = document.getElementById('commentInput');
      const username = usernameInput.value.trim();
      const commentText = commentInput.value.trim();

      if (username && commentText) {
          // Create a new comment object
          const comment = {
              id: Date.now(), // Unique ID for the comment
              username: username,
              text: commentText,
              replies: []
          };

          // Save the comment to localStorage
          saveComment(comment);

          // Clear the inputs
          usernameInput.value = "";
          commentInput.value = "";

          // Reload comments to display the new one
          loadComments();
      } else {
          alert("Please fill out both the username and comment fields!");
      }
  });
});

// Function to save a comment to localStorage
function saveComment(comment) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to load comments from localStorage
function loadComments() {
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = ""; // Clear the current comments

  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  comments.forEach(comment => {
      // Create a new list item for the comment
      const commentItem = document.createElement('li');
      commentItem.innerHTML = `
          <strong>${comment.username}:</strong> ${comment.text}
          <button class="delete-btn" data-id="${comment.id}" data-type="comment">Delete</button>
          <button class="reply-btn" data-id="${comment.id}">Reply</button>
          <div class="reply-section" style="display: none;">
              <input type="text" class="reply-username" placeholder="Your username">
              <textarea class="reply-comment" placeholder="Write your reply..."></textarea>
              <button class="post-reply-btn" data-id="${comment.id}">Post Reply</button>
          </div>
          <ul class="repliesList" data-id="${comment.id}"></ul>
      `;

      // Append the comment to the comments list
      commentsList.appendChild(commentItem);

      // Load replies for this comment
      loadReplies(comment.id, commentItem.querySelector('.repliesList'));

      // Add event listener for the reply button
      const replyBtn = commentItem.querySelector('.reply-btn');
      const replySection = commentItem.querySelector('.reply-section');
      replyBtn.addEventListener('click', () => {
          replySection.style.display = replySection.style.display === 'none' ? 'block' : 'none';
      });

      // Add event listener for the post reply button
      const postReplyBtn = commentItem.querySelector('.post-reply-btn');
      postReplyBtn.addEventListener('click', () => {
          const replyUsername = commentItem.querySelector('.reply-username').value.trim();
          const replyComment = commentItem.querySelector('.reply-comment').value.trim();

          if (replyUsername && replyComment) {
              const reply = {
                  id: Date.now(), // Unique ID for the reply
                  username: replyUsername,
                  text: replyComment
              };

              // Save the reply to localStorage
              saveReply(comment.id, reply);

              // Clear the reply inputs
              commentItem.querySelector('.reply-username').value = "";
              commentItem.querySelector('.reply-comment').value = "";
              replySection.style.display = 'none';

              // Reload replies to display the new one
              loadReplies(comment.id, commentItem.querySelector('.repliesList'));
          } else {
              alert("Please fill out both the username and reply fields!");
          }
      });

      // Add event listener for the delete button (comment)
      const deleteBtn = commentItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
          deleteComment(comment.id);
          loadComments(); // Reload comments after deletion
      });
  });
}

// Function to save a reply to localStorage
function saveReply(commentId, reply) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  const comment = comments.find(c => c.id === commentId);
  if (comment) {
      comment.replies.push(reply);
      localStorage.setItem('comments', JSON.stringify(comments));
  }
}

// Function to load replies for a comment
function loadReplies(commentId, repliesList) {
  repliesList.innerHTML = ""; // Clear the current replies

  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const comment = comments.find(c => c.id === commentId);

  if (comment && comment.replies) {
      comment.replies.forEach(reply => {
          const replyItem = document.createElement('li');
          replyItem.innerHTML = `
              <strong>${reply.username}:</strong> ${reply.text}
              <button class="delete-btn" data-id="${reply.id}" data-commentid="${commentId}" data-type="reply">Delete</button>
          `;
          repliesList.appendChild(replyItem);

          // Add event listener for the delete button (reply)
          const deleteBtn = replyItem.querySelector('.delete-btn');
          deleteBtn.addEventListener('click', () => {
              deleteReply(commentId, reply.id);
              loadReplies(commentId, repliesList); // Reload replies after deletion
          });
      });
  }
}

// Function to delete a comment
function deleteComment(commentId) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments = comments.filter(c => c.id !== commentId);
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to delete a reply
function deleteReply(commentId, replyId) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  const comment = comments.find(c => c.id === commentId);
  if (comment) {
      comment.replies = comment.replies.filter(r => r.id !== replyId);
      localStorage.setItem('comments', JSON.stringify(comments));
  }
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





  

