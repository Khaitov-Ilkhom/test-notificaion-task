import {useEffect, useState, useCallback} from "react";
import type {NotificationMessage} from "../../types";
import {
  connectToWebSocket, disconnectWebSocket,
  getWebSocketStatus, reconnectWebSocket
} from "../../services/websocket";
import {useAuthStore} from "../../store/auth-store";
import {Loading} from "../../components/loading/loading.tsx";
import {requestAndSaveFcmToken, setupForegroundMessageListener} from "../../services/firebase.ts";
import Navbar from "../../components/navbar/navbar.tsx";

const User = () => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // @ts-ignore
  const {userId} = useAuthStore();

  const handleNotification = useCallback((n: NotificationMessage) => {
    setNotifications((prev) => (prev.some((p) => p.id === n.id) ? prev : [n, ...prev]));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    (async () => {
      setIsLoading(true);
      try {
        await connectToWebSocket(userId, handleNotification);
        setIsConnected(true);
        interval = setInterval(() => {
          const status = getWebSocketStatus();
          setIsConnected(status);
          if (!status) reconnectWebSocket(userId, handleNotification).then(() => setIsConnected(true));
        }, 10000);
      } catch (e) {
        console.error("❌ WebSocket error:", e);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      if (interval) clearInterval(interval);
      disconnectWebSocket();
    };
  }, [userId, handleNotification]);

  useEffect(() => {
    (async () => {
      const token = await requestAndSaveFcmToken(userId);
      if (token) {
        setupForegroundMessageListener();
      }
    })();
  }, [userId]);

  const formatTime = (d: string) => {
    const date = new Date(d), now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 1) return "Hozir";
    if (diff < 60) return `${diff} daqiqa oldin`;
    if (diff < 1440) return `${Math.floor(diff / 60)} soat oldin`;
    return date.toLocaleDateString("uz-UZ");
  };

  if (isLoading) return <Loading/>;

  return (
      <div className="p-4 w-full mx-auto">
        <Navbar/>
        <div className="max-w-4xl mx-auto flex items-center justify-between mb-6 mt-[60px]">
          <h2 className="text-2xl font-bold">🔔 Bildirishnomalar</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{isConnected ? "Ulangan" : "Ulanmagan"}</span>
            </div>
            <div className="text-xs">User ID: {userId}</div>
          </div>
        </div>

        {notifications.flat(1).length ? (
            <>
              <div className="max-w-4xl mx-auto mb-4 text-sm text-gray-600">Jami {notifications.flat(1).length} ta bildirishnoma</div>
              <div className="max-w-4xl mx-auto space-y-3 mb-2">
                {notifications.flat(1).map((n) => (
                    <div key={n.id}
                         className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{n.title}</h3>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {n.type === "fcm" ? "Push" : "WebSocket"}
                      </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{n.body}</p>
                          <p className="text-gray-400 text-xs flex items-center">🕒 {formatTime(n.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </>
        ) : (
            <div className="max-w-4xl mx-auto text-center py-12 text-gray-500">
              <div className="text-gray-400 text-6xl mb-4">🔔</div>
              <p className="text-lg">Hech qanday bildirishnoma yo'q</p>
              <p className="text-sm text-gray-400 mt-2">Yangi bildirishnomalar bu yerda ko'rinadi</p>
            </div>
        )}
      </div>
  );
};

export default User;