export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return

  const permission = await Notification.requestPermission()

  console.log("Permission:", permission)
}

export const showNotification = medicine => {
  if (Notification.permission !== "granted") return

  new Notification("💊 Medicine Reminder", {
    body: `Time to take ${medicine.name}\nDosage: ${medicine.dosage}`,
  })
}