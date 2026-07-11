import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './index.css'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const onChangeInput = event => {
    const {name, value} = event.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmitForm = event => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // Get all registered users
    const users = JSON.parse(localStorage.getItem('users')) || []

    // Check if email already exists
    const existingUser = users.find(
      each =>
        each.email.toLowerCase() ===
        formData.email.toLowerCase(),
    )

    if (existingUser) {
      alert('Email already registered')
      return
    }

    // Save user (without confirmPassword)
    const newUser = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    }

    users.push(newUser)

    localStorage.setItem(
      'users',
      JSON.stringify(users),
    )

    alert('Registration Successful')

    navigate('/login')
  }

  return (
    <div className="register-container">
      <div className="register-card shadow">
        <h1 className="register-heading">
          Create Account
        </h1>

        <p className="register-description">
          Register to manage your medicines
        </p>

        <form onSubmit={onSubmitForm}>
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Age
              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={onChangeInput}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Gender
              </label>

              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={onChangeInput}
                required
              >
                <option value="">
                  Select Gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Phone Number
            </label>

            <input
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChangeInput}
              required
            />
          </div>

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account?{' '}
          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register