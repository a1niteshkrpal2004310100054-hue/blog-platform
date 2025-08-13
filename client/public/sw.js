self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push received:", data);

  self.registration.showNotification(data.message, {
    body: data.body,
    icon: "/icons/icon-192x192.png",
    data: data.data,
  });
});
