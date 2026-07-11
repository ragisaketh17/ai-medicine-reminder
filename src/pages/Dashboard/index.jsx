import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar'

import {
  FaPills,
  FaBell,
  FaCheckCircle,
  FaPlusCircle,
} from 'react-icons/fa'

import {showNotification} from '../../utils/notification'

import './index.css'

const Dashboard = () => {
  const [medicines, setMedicines] = useState([])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    const medicineList =
      JSON.parse(
        localStorage.getItem(`medicines_${loggedInUser}`),
      ) || []

    setMedicines(medicineList)
  }, [])

  useEffect(() => {
  const interval = setInterval(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (!loggedInUser) return

    const medicineList =
      JSON.parse(
        localStorage.getItem(`medicines_${loggedInUser}`)
      ) || []

    const now = new Date()
    const currentMinutes =
      now.getHours() * 60 + now.getMinutes()

    let updated = false

    const convertToMinutes = time => {
      const [clock, period] = time.split(' ')
      let [hour, minute] = clock.split(':').map(Number)

      if (period === 'PM' && hour !== 12) hour += 12
      if (period === 'AM' && hour === 12) hour = 0

      return hour * 60 + minute
    }

    medicineList.forEach(each => {
  const medicineMinutes = convertToMinutes(each.time)

  if (
    currentMinutes >= medicineMinutes &&
    each.status === 'Pending'
  ) {
    // Start reminder
    if (!each.reminderStartedAt) {
      each.reminderStartedAt = Date.now()
      each.reminderCount = 0
      each.lastReminder = -1
      updated = true
    }

    const elapsed = Date.now() - each.reminderStartedAt

    // Stop after 1 minute
    if (elapsed <= 60000) {
      // Reminder every 6 seconds
      const reminderIndex = Math.floor(elapsed / 6000)

      if (
        reminderIndex > each.lastReminder &&
        each.reminderCount < 10
      ) {
        showNotification(each)

        each.reminderCount += 1
        each.lastReminder = reminderIndex

        updated = true
      }
    }
  }
})

if (updated) {
  localStorage.setItem(
    `medicines_${loggedInUser}`,
    JSON.stringify(medicineList)
  )

  setMedicines([...medicineList])
}
}, 1000) // Check every second

return () => clearInterval(interval)
}, [])

  const onClickTaken = id => {
  const loggedInUser = localStorage.getItem('loggedInUser')

  const medicineList =
    JSON.parse(
      localStorage.getItem(`medicines_${loggedInUser}`)
    ) || []

  const updatedMedicines = medicineList.map(each => {
    if (each.id === id) {
      return {
        ...each,
        status: 'Taken',
      }
    }

    return each
  })

  localStorage.setItem(
    `medicines_${loggedInUser}`,
    JSON.stringify(updatedMedicines)
  )

  setMedicines(updatedMedicines)
}

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Medicine Reminder Dashboard</h1>

        <p>
          Welcome back! Stay healthy and never miss your
          medicines.
        </p>
      </div>

      <div className="cards-container">
        <div className="dashboard-card">
          <FaPills className="card-icon" />

          <h2>{medicines.length}</h2>

          <p>Total Medicines</p>
        </div>

        <div className="dashboard-card">
          <FaBell className="card-icon" />

          <h2>{medicines.length}</h2>

          <p>Today's Reminders</p>
        </div>

        <div className="dashboard-card">
          <FaCheckCircle className="card-icon" />

          <h2>
  {medicines.filter(each => each.status === 'Taken').length}
</h2>

          <p>Completed</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="buttons">
          <Link to="/add-medicine">
            <button className="action-btn">
              <FaPlusCircle /> Add Medicine
            </button>
          </Link>

          <Link to="/medicines">
            <button className="action-btn">
              <FaPills /> View Medicines
            </button>
          </Link>

          <Link to="/profile">
            <button className="action-btn">
              Profile
            </button>
          </Link>
        </div>
      </div>

      <div className="schedule">
        <h2>Today's Schedule</h2>

        {medicines.length === 0 ? (
          <p>No medicines added for today.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map(each => (
                <tr key={each.id}>
                  <td>{each.name}</td>

                  <td>{each.time}</td>

                  <td>
                    {each.status === 'Taken' ? (
                      <span className="taken-text">
                        ✅ Taken
                      </span>
                    ) : (
                      <span className="pending-text">
                        ⏳ Pending
                      </span>
                    )}
                  </td>

                  <td>
                    {each.status === 'Pending' ? (
                      <button
                        className="taken-btn"
                        onClick={() => onClickTaken(each.id)}
                      >
                        Taken
                      </button>
                    ) : (
                      <span className="done-text">
                        ✔ Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Dashboard