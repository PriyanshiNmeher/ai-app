export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('localStorage error:', e)
  }
}

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {}
}