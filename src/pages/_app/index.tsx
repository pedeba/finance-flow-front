import { createFileRoute } from '@tanstack/react-router'

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
  return (
      <div>
        Tetse
      </div>
  )
}
