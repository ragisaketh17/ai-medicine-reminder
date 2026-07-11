export const loginUser = token => {
  localStorage.setItem('token', token)
}

export const logoutUser = () => {
  localStorage.removeItem('token')
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}