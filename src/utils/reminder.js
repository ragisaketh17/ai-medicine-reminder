import {showNotification} from './notification'

export const startMedicineReminder = () => {
  setInterval(() => {

    const loggedInUser = localStorage.getItem('loggedInUser')

    if (!loggedInUser) {
      return
    }

    const medicines =
      JSON.parse(
        localStorage.getItem(`medicines_${loggedInUser}`)
      ) || []


    const now = new Date()

    let hour = now.getHours()
    const minute = String(now.getMinutes()).padStart(2, '0')

    const period = hour >= 12 ? 'PM' : 'AM'

    hour = hour % 12 || 12

    const currentTime =
      `${String(hour).padStart(2, '0')}:${minute} ${period}`


    medicines.forEach(medicine => {

      if (
        medicine.time === currentTime &&
        medicine.status === 'Pending'
      ) {

        showNotification(
          "💊 Medicine Reminder",
          `Time to take ${medicine.name} (${medicine.dosage})`
        )

      }

    })


  }, 60000)
}