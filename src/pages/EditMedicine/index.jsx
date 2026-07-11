import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import './index.css'

const EditMedicine = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [medicine, setMedicine] = useState({
    name: '',
    dosage: '',
    time: '',
    status: 'Pending',
  })

  useEffect(() => {
    const medicines =
      JSON.parse(localStorage.getItem('medicines')) || []

    const selectedMedicine = medicines.find(
      each => each.id === Number(id),
    )

    if (selectedMedicine) {
      setMedicine(selectedMedicine)
    }
  }, [id])

  const onChangeInput = event => {
    const {name, value} = event.target

    setMedicine(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmitForm = event => {
    event.preventDefault()

    const medicines =
      JSON.parse(localStorage.getItem('medicines')) || []

    const updatedMedicines = medicines.map(each =>
      each.id === Number(id) ? medicine : each,
    )

    localStorage.setItem(
      'medicines',
      JSON.stringify(updatedMedicines),
    )

    alert('Medicine Updated Successfully')

    navigate('/medicines')
  }

  return (
    <div className="edit-medicine-container">
      <div className="edit-card">
        <h1>Edit Medicine</h1>

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

            <input
              type="time"
              name="time"
              className="form-control"
              value={medicine.time}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="mb-4">
            <label>Status</label>

            <select
              name="status"
              className="form-select"
              value={medicine.status}
              onChange={onChangeInput}
            >
              <option>Pending</option>
              <option>Taken</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Update Medicine
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditMedicine