// sw.ts

// Self refers to ServiceWorkerGlobalScope
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event: PushEvent) => {
  let data = { title: "Default title", body: "Default body" };

  if (event.data) {
    try {
      data = event.data.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Fallback if data is not JSON
      data.body = event.data.text();
    }
  }

  const promiseChain = self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon-512x512.png", // optional icon
  });

  event.waitUntil(promiseChain);
});
