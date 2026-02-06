import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/matches/$match/edit')({
  component: EditMatch,
})

function EditMatch() {
  return <div>Hello "/admin/matches/$match/edit"!</div>
}
