export const formatTime = time => {
  const date = new Date(`2000-01-01 ${time}`)

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}