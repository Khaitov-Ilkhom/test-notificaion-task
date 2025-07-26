importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBRfSRHUszwxuoQuDNfWgpakrMS6IWOmMA",
  authDomain: "auction-e9696.firebaseapp.com",
  projectId: "auction-e9696",
  storageBucket: "auction-e9696.firebasestorage.app",
  messagingSenderId: "714963113012",
  appId: "1:714963113012:web:4abf85c9bebbefdf8f2661",
  measurementId: "G-F45ME0EVE6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});