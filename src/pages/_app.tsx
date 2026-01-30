import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getAuthUser } from '../lib/auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    
    if (!user?.id) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  return <Outlet />
}
