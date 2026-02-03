const BASE_URL = 'http://localhost:3001/auth'

export const authApi = {
  login: async ({ email, password, remember = false }: { email: string; password: string; remember?: boolean }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, remember }),
    })
    if (!response.ok) {
      const {error} = await response.json() as {error: string}
      throw new Error(error)
    }
  },
  register: async ({ name, email, birthDate, password }: { name: string; email: string; birthDate: string; password: string }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, birthDate, password }),
    })
    if (!response.ok) {
      const {error} = await response.json() as {error: string}
      throw new Error(error)
    }
  },
  logout: async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error('Erro ao fazer logout')
    }
    return response.ok
  },
}