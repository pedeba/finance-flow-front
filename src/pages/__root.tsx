import { Outlet, HeadContent, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
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
