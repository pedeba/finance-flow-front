import { authApi} from '../api/auth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { IUser } from '../types/user.type'
import { userApi } from '../api/user'
import { useNavigate } from '@tanstack/react-router'


export function useAuth() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: user, isLoading } = useQuery<IUser>({
    queryKey: ['user'],
    queryFn: userApi.getUser,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      await queryClient.fetchQuery({ 
        queryKey: ['user'], 
        queryFn: userApi.getUser,
      })
      navigate({ to: '/' })
    },
  })

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      navigate({ to: '/login', search: { registered: true } })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      navigate({ to: '/login', search: { registered: undefined } })
      queryClient.setQueryData(['user'], null)
    },
  })

  return { 
    user, 
    isLoading,
    isAuthenticated: !!user?.id,
    login: loginMutation.mutate,
    loginPending: loginMutation.isPending,
    loginError: loginMutation.error,
    resetLoginError: loginMutation.reset,
    logout: logoutMutation.mutate,
    register: registerMutation.mutate,
    registerPending: registerMutation.isPending,
    registerError: registerMutation.error,
    resetRegisterError: registerMutation.reset,
  }

}