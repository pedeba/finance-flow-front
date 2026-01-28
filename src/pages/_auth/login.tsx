import { createFileRoute } from '@tanstack/react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './login.module.css'
import { Form } from '../../components/form'

const loginSchema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres'),
  name: z.string().nonempty('Nome é obrigatório'),
})

export const Route = createFileRoute('/_auth/login')({
  component: Login,
  head: () => ({
    meta: [{ title: 'Login | Finance Flow' }],
  }),
})

type LoginSchemaType = z.infer<typeof loginSchema>

function Login() {
  const createLoginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })
  
  const onSubmit = (data: LoginSchemaType) => {
    console.log(data)
  }

  const { 
    handleSubmit, 
    formState: { isSubmitting }, 
  } = createLoginForm;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      
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

          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input id="name" type="text" name="name" placeholder="Digite seu nome" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
