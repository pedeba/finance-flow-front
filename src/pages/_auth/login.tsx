import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './auth-form.module.css'
import { Form } from '../../components/form'
import { useAuth } from '../../hooks/use-auth'
import { ToastComponent } from '../../components/Toast'

const loginSchema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const Route = createFileRoute('/_auth/login')({
  component: Login,
  head: () => ({
    meta: [{ title: 'Login | Finance Flow' }],
  }),
})

type LoginSchemaType = z.infer<typeof loginSchema>

function Login() {
  const { login, loginPending, loginError, resetLoginError } = useAuth()
  
  const createLoginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })
  
  const onSubmit = (data: LoginSchemaType) => {
    login(data)
  }

  const { 
    handleSubmit, 
  } = createLoginForm;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      
      {loginError && (
        <ToastComponent
          open={!!loginError}
          onOpenChange={(open) => !open && resetLoginError()}
          title="Erro no login"
          description={loginError.message}
          variant="error"
        />
      )}

      <FormProvider {...createLoginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input id="email" type="email" name="email" placeholder="Digite seu email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input id="password" type="password" name="password" placeholder="Digite sua senha" />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <button 
            type="submit" 
            disabled={loginPending}
            className={styles.submitButton}
          >
            {loginPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </FormProvider>
      <span>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </span>

    </div>
  )
}
