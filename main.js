// Import the Random User Generator JavaScript library.
import RandomUserGenerator from 'random-user-generator-js';

// Create a Random User Generator client object.
const client = new RandomUserGenerator();

// Get a random user object.
const user = await client.getRandomUser();

// Get the user's avatar URL.
const avatarUrl = user.avatarUrl;

// Create a video element.
const video = document.createElement('video');

// Set the video element's srcObject to the user's avatar URL.
video.srcObject = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', avatarUrl);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    if (xhr.status === 200) {
      resolve(new MediaStream([new MediaStreamTrack('video', xhr.response)));
    } else {
      reject(new Error('Failed to load avatar: ' + xhr.statusText));
    }
  };
  xhr.send();
});

// Start playing the video element.
video.play();
