import {useNavigate} from 'react-router-dom'
import './index.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="hero-content">
          <span className="badge">Welcome</span>

          <h1 className="hero-title">
            AI Medicine Reminder
          </h1>

          <p className="hero-description">
            A simple and smart way to manage your medicines,
            stay organized, and never miss an important dose.
          </p>

          <div className="button-group">
            <button
              className="get-started-btn"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>

            <button
              className="login-btn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home