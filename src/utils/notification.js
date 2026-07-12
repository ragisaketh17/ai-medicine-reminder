export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return

  const permission = await Notification.requestPermission()

  if (permission === 'granted') {
    console.log('Notification permission granted')
  }
}

export const showNotification = medicine => {
  if (Notification.permission === 'granted') {
    new Notification('💊 Medicine Reminder', {
      body: `Time to take ${medicine.name}\nDosage: ${medicine.dosage}`,
    })
  }
}