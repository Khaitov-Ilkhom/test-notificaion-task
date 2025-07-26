import {Client, type IMessage} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {NotificationMessage} from "../types";

let client: Client | null = null;
let isConnected = false;

export const connectToWebSocket = (
    userId: number,
    onMessage: (n: NotificationMessage) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (client) client.deactivate();

    client = new Client({
      webSocketFactory: () => new SockJS("https://api-auction.tenzorsoft.uz/ws"),
      reconnectDelay: 1000,
      heartbeatIncoming: 1000,
      heartbeatOutgoing: 1000,
      debug: (str) => {
        if (!/heart-beat|PING|PONG/.test(str)) console.log("STOMP:", str);
      },
      onConnect: () => {
        isConnected = true;
        console.log("✅ STOMP connected");
        client?.subscribe(`/topic/notification/getAllNotifications/${userId}`, (msg: IMessage) => {
          try {
            onMessage(JSON.parse(msg.body));
          } catch (e) {
            console.error("❌ JSON parse error:", e);
          }
        });
        client?.publish({
          destination: `/app/notification/getAllNotifications/${userId}`,
          body: JSON.stringify({ userId }),
        });
        resolve();
      },
      onStompError: (f) => {
        console.error("❌ STOMP error:", f);
        isConnected = false;
      },
      onWebSocketError: (e) => {
        console.error("❌ WebSocket error:", e);
        isConnected = false;
        reject(e);
      },
      onDisconnect: () => {
        console.log("🔌 STOMP disconnected");
        isConnected = false;
      }
    });

    client.activate();
  });
};

export const disconnectWebSocket = () => {
  if (client?.connected) client.deactivate();
  client = null;
  isConnected = false;
  console.log("✅ WebSocket disconnected");
};

export const getWebSocketStatus = () => isConnected && client?.connected === true;

export const reconnectWebSocket = (userId: number, onMessage: (n: NotificationMessage) => void) => {
  console.log("🔄 Reconnecting WebSocket...");
  disconnectWebSocket();
  return connectToWebSocket(userId, onMessage);
};