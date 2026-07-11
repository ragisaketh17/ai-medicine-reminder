import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const AddMedicine = () => {
  const navigate = useNavigate()

  const [medicine, setMedicine] = useState({
    name: '',
    dosage: '',
    hour: '01',
    minute: '00',
    period: 'AM',
    status: 'Pending',
  })

  const onChangeInput = event => {
    const {name, value} = event.target

    setMedicine(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmitForm = event => {
  event.preventDefault()

  const loggedInUser = localStorage.getItem('loggedInUser')

  if (!loggedInUser) {
    navigate('/login', {replace: true})
    return
  }

  const medicines =
    JSON.parse(localStorage.getItem(`medicines_${loggedInUser}`)) || []

  const newMedicine = {
    id: Date.now(),
    name: medicine.name,
    dosage: medicine.dosage,
    time: `${medicine.hour}:${medicine.minute} ${medicine.period}`,
    status: 'Pending',
  }

  medicines.push(newMedicine)

  localStorage.setItem(
    `medicines_${loggedInUser}`,
    JSON.stringify(medicines),
  )

  alert('Medicine Added Successfully')

  navigate('/dashboard', {replace: true})
}

  return (
    <div className="add-medicine-container">
      <div className="add-card">
        <h1>Add Medicine</h1>

        <form onSubmit={onSubmitForm}>
          <div className="mb-3">
            <label>Medicine Name</label>

            <input
              type="text"
              name="name"
              className="form-control"
              value={medicine.name}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="mb-3">
            <label>Dosage</label>

            <input
              type="text"
              name="dosage"
              className="form-control"
              value={medicine.dosage}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="mb-3">
            <label>Reminder Time</label>

            <div className="d-flex gap-2">
              <select
                name="hour"
                className="form-select"
                value={medicine.hour}
                onChange={onChangeInput}
              >
                {Array.from({length: 12}, (_, index) => {
                  const hour = String(index + 1).padStart(2, '0')

                  return (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  )
                })}
              </select>

              <select
                name="minute"
                className="form-select"
                value={medicine.minute}
                onChange={onChangeInput}
              >
                {Array.from({length: 60}, (_, index) => {
                  const minute = String(index).padStart(2, '0')

                  return (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  )
                })}
              </select>

              <select
                name="period"
                className="form-select"
                value={medicine.period}
                onChange={onChangeInput}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Save Medicine
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddMedicine