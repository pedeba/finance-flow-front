import type { QueryClient } from '@tanstack/react-query'
import { Outlet, HeadContent, Link, createRootRouteWithContext } from '@tanstack/react-router'

type RootRouteContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <Link to="/">Go home</Link>
      </div>
    )
  },
})

function RootComponent() {
  return (
    <>
      <HeadContent/>
      <Outlet />
    </>
  )
}
