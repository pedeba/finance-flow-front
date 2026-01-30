import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../../hooks/use-auth'

export const Route = createFileRoute('/_app/')({
  component: Home,
  head: () => ({
    meta: [
      {
        title: 'Finance Flow',
      },
    ],
  }),
})

function Home() {
  const { logout, user} = useAuth()
  return (
      <div>
        Teste {user?.name}
        <button onClick={() => logout()}>Logout</button>
      </div>
  )
}
