const BASE_URL = 'http://localhost:3001/auth'

export const authApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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