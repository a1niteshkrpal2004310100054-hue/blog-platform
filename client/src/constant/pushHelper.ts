import { api } from "./api";

export const subscribeUser = async (publickey: string, userId: string) => {
  // console.log(publickey, userId);
  if (!("serviceWorker" in navigator)) {
    throw new Error("service worker is not supported in browser");
  }

  console.log(navigator);
  console.log(Notification.permission);

  // if (!("PushManager" in navigator)) {
  //   throw new Error("Push messanging is not supported in browser");
  // }

  const register = await navigator.serviceWorker.register("/sw.js");

  //   Ask user to permission
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission Denied");
  } else {
    console.log("granted");
  }

  //   Subscribe to push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publickey),
  });

  await api.post(`/notification/subscribe-notification`, {
    subscription,
    userId,
  });
};

export function urlBase64ToUint8Array(base64url: string) {
  // fix padding for the base 64 url (must be multiple of 4)
  const padding = "=".repeat(4 - ((base64url.length % 4) % 4));

  //   conver from base64Url to standard base64 Url
  const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");

  //   decode 64 to row binary string

  const row = window.atob(base64);

  //   convert binary string to Uint8Array
  return Uint8Array.from([...row].map((char) => char.charCodeAt(0)));
}
