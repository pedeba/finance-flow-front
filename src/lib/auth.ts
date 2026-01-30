import type { QueryClient } from '@tanstack/react-query'
import type { IUser } from '../types/user.type'
import { userApi } from '../api/user'

export async function getAuthUser(queryClient: QueryClient): Promise<IUser | null> {
  let user = queryClient.getQueryData<IUser>(['user'])
  
  if (user === undefined) {
    user = await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: userApi.getUser,
      staleTime: Infinity,
      gcTime: Infinity,
    })
  }
  
  return user ?? null
}

