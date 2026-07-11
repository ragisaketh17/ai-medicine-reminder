import {useEffect} from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Medicines from './pages/Medicines'
import Profile from './pages/Profile'
import AddMedicine from './pages/AddMedicine'
import EditMedicine from './pages/EditMedicine'
import NotFound from './pages/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import {requestNotificationPermission} from './utils/notification'
import {startMedicineReminder} from './utils/reminder'

const App = () => {
  const location = useLocation()

  useEffect(() => {
    requestNotificationPermission()
    startMedicineReminder()
  }, [])

  const hideNavbar =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register'

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicines"
          element={
            <ProtectedRoute>
              <Medicines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-medicine"
          element={
            <ProtectedRoute>
              <AddMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  )
}

export default App