export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("This browser doesn't support notifications.")
    return
  }

  const permission = await Notification.requestPermission()

  if (permission === "granted") {
    console.log("Notification permission granted")
  } else {
    console.log("Notification permission denied")
  }
}

export const showNotification = medicine => {
  if (Notification.permission !== "granted") {
    return
  }

  new Notification("💊 Medicine Reminder", {
    body: `Time to take ${medicine.name}\nDosage: ${medicine.dosage}`,
  })
}