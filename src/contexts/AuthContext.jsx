import React, { createContext, useState, useEffect } from 'react'
import { getToken, setTokens, clearTokens } from '../hooks/useAuth'
import { login as apiLogin } from '../api'

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // при инициализации, если в localStorage есть токен — считаем, что юзер авторизован
useEffect(() => {
  const token = getToken();
  if (token) {
    setUser({});
  }
}, []);

  // функция логина
  const login = async ({ email, password }) => {
    const tokens = await apiLogin({ email, password })
    setTokens(tokens)        // сохраняем в localStorage
    setUser({ email })       // или заменить на ответ из /profile
  }

  // функция логаута
  const logout = () => {
    clearTokens()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
