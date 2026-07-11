import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    localStorage.removeItem('loggedInUser')
    navigate('/login', {replace: true})
  }

  return (
    <nav className="navbar">
      <h2>💊 AI Medicine Reminder</h2>

      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/medicines">Medicines</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar