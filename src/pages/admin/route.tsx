import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthUser } from '../../lib/auth'
import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '../../components/sidebar/index'
import { Home, Volleyball, Users, ClipboardList } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    
    if (!user?.id) {
      throw redirect({ to: '/login', search: { registered: undefined } })
    }

    if (user?.role !== 'admin') {
      throw redirect({ to: '/' })
    }
  }
})

function RouteComponent() {
  return (
    <div className="container">
      <Sidebar.Root>
        <Sidebar.Brand logo="/test.svg" />
        <Sidebar.Nav>
          <Sidebar.NavList>
            <Sidebar.NavLink to="/admin" icon={<Home size={18} />} text="Home" exact />
            <Sidebar.NavLink to="/admin/matches" icon={<Volleyball size={18} />} text="Partidas" />
            <Sidebar.NavLink to="/admin/players" icon={<Users size={18} />} text="Jogadores" />
            <Sidebar.NavLink to="/admin/lineups" icon={<ClipboardList size={18} />} text="Escalações" />
          </Sidebar.NavList>
        </Sidebar.Nav>
      </Sidebar.Root>
      <Outlet />
      <div className="secondary-content-container">
      </div>
    </div>
  )
}
