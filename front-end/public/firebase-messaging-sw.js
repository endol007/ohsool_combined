importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCyIC4ThphESsewSBdCfoPP21XdMlb2G3c",
    authDomain: "push-notification-8a11e.firebaseapp.com",
    projectId: "push-notification-8a11e",
    storageBucket: "push-notification-8a11e.appspot.com",
    messagingSenderId: "652126511609",
    appId: "1:652126511609:web:74ddb4f69f795bb4cc9d28",
    measurementId: "G-85534ZWSE9"
});
const messaging = firebase.messaging();