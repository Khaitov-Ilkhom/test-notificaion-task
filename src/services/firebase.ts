import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage, isSupported} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBRfSRHUszwxuoQuDNfWgpakrMS6IWOmMA",
  authDomain: "auction-e9696.firebaseapp.com",
  projectId: "auction-e9696",
  storageBucket: "auction-e9696.firebasestorage.app",
  messagingSenderId: "714963113012",
  appId: "1:714963113012:web:4abf85c9bebbefdf8f2661",
  measurementId: "G-F45ME0EVE6"
};

const app = initializeApp(firebaseConfig);

export async function getFirebaseMessaging() {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("❌ Messaging bu brauzerda ishlamaydi");
      return null;
    }
    return getMessaging(app);
  } catch (e) {
    console.error("❌ Messaging initialize xato:", e);
    return null;
  }
}

const VAPID_KEY = "BND5ym5-wvp3EIYvvOpdiDxDle9Wbp3mZhlqZvEwjSSxIPzWZ-MIFN61skPhmUVTRHkBjfBj7AkahbYDDNP9arU";

export async function requestAndSaveFcmToken(userId: number): Promise<string | null> {
  try {
    if (!("Notification" in window)) {
      console.warn("❌ Brauzer notificationsni qo‘llab-quvvatlamaydi");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("❌ FCM ruxsati berilmadi");
      return null;
    }

    const messaging = await getFirebaseMessaging();
    if (!messaging) return null;

    const fcmToken = await getToken(messaging, {vapidKey: VAPID_KEY});
    if (!fcmToken) {
      console.error("❌ Token olinmadi");
      return null;
    }

    console.log("✅ Token olingan:", fcmToken);

    const resp = await fetch(`https://api-auction.tenzorsoft.uz/notification/setFireBaseToken?token=${fcmToken}&userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP xato: ${resp.status}`);
    }

    console.log("✅ Token backendga saqlandi");
    return fcmToken;
  } catch (e) {
    console.error("❌ Token saqlashda xato:", e);
    return null;
  }
}

export async function setupForegroundMessageListener() {
  const messaging = await getFirebaseMessaging();
  const permission = await Notification.requestPermission();

  if (!messaging) return;
  onMessage(messaging, (payload) => {
    console.log("📩 Yangi foreground xabar:", payload);
    if (permission === "granted") {
      new Notification(payload.notification?.title ?? "Yangi xabar", {
        body: payload.notification?.body ?? "",
        icon: "",
      });
    }
  });
}