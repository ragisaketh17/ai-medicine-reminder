import './index.css'

const ReminderForm = () => (
  <form className="reminder-form">
    <input type="text" placeholder="Medicine Name" />

    <input type="time" />

    <button type="submit">
      Save Reminder
    </button>
  </form>
)

export default ReminderForm