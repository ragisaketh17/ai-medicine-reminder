import {useEffect, useState} from 'react'
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
} from 'react-icons/fa'
import './index.css'

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    const users = JSON.parse(localStorage.getItem('users')) || []

    const currentUser = users.find(
      each => each.email === loggedInUser,
    )

    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>No User Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle className="profile-image" />

        <h1>{user.name}</h1>

        <p className="profile-role">
          AI Medicine Reminder User
        </p>

        <div className="profile-details">
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <span>{user.email}</span>
          </div>

          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <span>{user.phone}</span>
          </div>

          <div className="detail-item">
            <FaBirthdayCake className="detail-icon" />
            <span>Age: {user.age}</span>
          </div>

          <div className="detail-item">
            <strong>Gender:</strong>
            <span>{user.gender}</span>
          </div>
        </div>

        <button className="edit-profile-btn">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default Profile