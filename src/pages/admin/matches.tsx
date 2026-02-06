import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/matches')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="content-container">
      <h1>Partidas</h1>
    </div>
  )
}
