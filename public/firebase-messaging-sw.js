// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');
/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
*/
firebase.initializeApp({
    apiKey: 'AIzaSyArHS1SVWot8cGMU0XeEtFxcokcGcqaJQY',
      authDomain: 'azuramart-df8b6.firebaseapp.com',
      databaseURL: 'https://azuramart-df8b6.firebaseio.com',
      projectId: 'azuramart-df8b6',
      storageBucket: 'azuramart-df8b6.appspot.com',
      messagingSenderId: '450910724009',
      appId: '1:450910724009:web:3ded123d63c538a89c6eb8',
      measurementId: 'G-4WQZX19FMN',
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log("Message received.", payload);
    const title = "Hello world is awesome";
    const options = {
        body: "Your notificaiton message .",
        icon: "../public/assets/images/logo/Azura_sma_logo.png",
    };
    return self.registration.showNotification(
        title,
        options,
    );
});
