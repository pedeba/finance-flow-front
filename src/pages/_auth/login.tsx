import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './auth-form.module.css'
import { Form } from '../../components/form'
import { useAuth } from '../../hooks/use-auth'
import { ToastComponent } from '../../components/radix/toast'
import { PasswordToggleField } from '../../components/radix/password-toggle-field'
import { CheckBox } from '../../components/radix/checkbox'
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter'


const loginSchema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
  remember: z.boolean().optional(),
})

const loginSearchSchema = z.object({
  registered: fallback(z.boolean().optional(), undefined)
})

export const Route = createFileRoute('/_auth/login')({
  component: Login,
  validateSearch: zodSearchValidator(loginSearchSchema),
  head: () => ({
    meta: [{ title: 'Login | Finance Flow' }],
  }),
})

type LoginSchemaType = z.infer<typeof loginSchema>

function Login() {
  const { login, loginPending, loginError, resetLoginError } = useAuth()
  const navigate = useNavigate()
  const { registered } = Route.useSearch()

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
      <h1 className={styles.title}>Entrar</h1>
      
      {registered && (
        <ToastComponent
          open={!!registered}
          onOpenChange={(open) => !open && navigate({
            to: '/login',
            replace: true,
            search: { registered: undefined },
          })}
          title="Cadastro realizado com sucesso"
          description="Você pode agora fazer login"
          variant="success"
        />
      )}

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
            <Form.Label className={styles.label} htmlFor="email">Email</Form.Label>
            <Form.Input id="email" type="email" name="email" placeholder="Digite seu email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label className={styles.label} htmlFor="password">Senha</Form.Label>
            <PasswordToggleField id="password" name="password" placeholder="Digite sua senha" />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <CheckBox id="remember" label="Lembrar-me" name="remember" />

          <button 
            type="submit" 
            disabled={loginPending}
            className={styles.submitButton}
          >
            {loginPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </FormProvider>
      <span className={styles.link}>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </span>

    </div>
  )
}
