import {Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import './index.css'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <h1 className="error-code">404</h1>

        <h2 className="error-heading">Page Not Found</h2>

        <p className="error-description">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <button className="home-btn">
            <FaHome className="home-icon" />
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound