import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitForm = event => {
    event.preventDefault()

    const users =
      JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      each =>
        each.email.trim().toLowerCase() ===
          email.trim().toLowerCase() &&
        each.password === password,
    )

    if (user) {
      Cookies.set('jwt_token', 'sample_token', {
        expires: 7,
      })

      localStorage.setItem(
        'loggedInUser',
        user.email,
      )

      alert('Login Successful')

      navigate('/dashboard', {replace: true})
    } else {
      alert('Invalid Email or Password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card shadow">

        <h1 className="login-heading">
          Welcome Back
        </h1>

        <p className="login-description">
          Login to continue using AI Medicine Reminder
        </p>

        <form
          className="login-form"
          onSubmit={onSubmitForm}
        >

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={e =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={e =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Login
          </button>

        </form>

        <p className="signup-text mt-3">
          Don't have an account?{' '}

          <Link
            to="/register"
            className="signup-link"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login