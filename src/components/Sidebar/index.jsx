import {Link} from 'react-router-dom'
import './index.css'

const Sidebar = () => (
  <div className="sidebar">
    <Link to="/dashboard">Dashboard</Link>

    <Link to="/medicines">Medicines</Link>

    <Link to="/add-medicine">Add Medicine</Link>

    <Link to="/profile">Profile</Link>
  </div>
)

export default Sidebar