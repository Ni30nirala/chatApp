// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBly6GLZW5vz4H4CRquPibhAjx7xWxbGKQ",
  authDomain: "munnamunni-65fa4.firebaseapp.com",
  databaseURL: "https://munnamunni-65fa4-default-rtdb.firebaseio.com",
  projectId: "munnamunni-65fa4",
  storageBucket: "munnamunni-65fa4.firebasestorage.app",
  messagingSenderId: "427977900003",
  appId: "1:427977900003:web:789c74bf6ddf8a0359ead6",
  measurementId: "G-704297800Z"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// Get DOM elements
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');

// Send message to Firebase
sendButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const message = messageInput.value;
  
  if (username && message) {
    db.ref('messages').push({
      username: username,
      message: message,
      timestamp: Date.now()
    });
    messageInput.value = '';  // Clear input after sending
  }
});

// Listen for new messages
db.ref('messages').on('child_added', (snapshot) => {
  const data = snapshot.val();
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = `${data.username}: ${data.message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to the bottom
});
