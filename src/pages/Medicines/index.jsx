import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaPlusCircle, FaEdit, FaTrash} from 'react-icons/fa'
import './index.css'

const Medicines = () => {
  const [medicines, setMedicines] = useState([])

  const loadMedicines = () => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (!loggedInUser) {
      setMedicines([])
      return
    }

    const storedMedicines =
      JSON.parse(
        localStorage.getItem(`medicines_${loggedInUser}`)
      ) || []

    setMedicines(storedMedicines)
  }

  useEffect(() => {
    loadMedicines()
  }, [])

  const onDeleteMedicine = id => {
    const updatedMedicines = medicines.filter(
      each => each.id !== id,
    )

    setMedicines(updatedMedicines)

    const loggedInUser = localStorage.getItem('loggedInUser')

    localStorage.setItem(
      `medicines_${loggedInUser}`,
      JSON.stringify(updatedMedicines),
    )
  }

  return (
    <div className="medicines-container">
      <div className="medicines-header">
        <h1>My Medicines</h1>

        <Link to="/add-medicine">
          <button className="add-btn">
            <FaPlusCircle />
            {' '}Add Medicine
          </button>
        </Link>
      </div>

      {medicines.length === 0 ? (
        <div className="empty-container">
          <h2>No medicines added yet</h2>

          <p>Click the button below to add your first medicine.</p>

          <Link to="/add-medicine">
            <button className="add-btn">
              <FaPlusCircle />
              {' '}Add Medicine
            </button>
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Reminder Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map(each => (
                <tr key={each.id}>
                  <td>{each.name}</td>

                  <td>{each.dosage}</td>

                  <td>{each.time}</td>

                  <td>
                    <span
                      className={
                        each.status === 'Taken'
                          ? 'taken'
                          : 'pending'
                      }
                    >
                      {each.status}
                    </span>
                  </td>

                  <td>
                    <Link to={`/edit/${each.id}`}>
                      <button className="edit-btn">
                        <FaEdit />
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => onDeleteMedicine(each.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Medicines