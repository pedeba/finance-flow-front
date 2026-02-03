import { createFileRoute, Link } from '@tanstack/react-router'
import styles from './auth-form.module.css'
import {useForm, FormProvider} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../../components/form'
import { useAuth } from '../../hooks/use-auth'
import { ToastComponent } from '../../components/radix/toast'

export const Route = createFileRoute('/_auth/register')({
  component: Register,
  head: () => ({
    meta: [{ title: 'Cadastro | Finance Flow' }],
  }),
})

const registerSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  birthDate: z.string().nonempty('Data de nascimento é obrigatória').regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Data de nascimento inválida'),
  password: z.string().nonempty('Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().nonempty('Confirmação de senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas não coincidem',
})

type RegisterSchemaType = z.infer<typeof registerSchema>

function Register() {
  const { register, registerPending, registerError, resetRegisterError } = useAuth()

  const createRegisterForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = (data: RegisterSchemaType) => {
    register(data)
  }

  const {
    handleSubmit,
  } = createRegisterForm;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro</h1>

      {registerError && (
        <ToastComponent
          open={!!registerError}
          onOpenChange={(open) => !open && resetRegisterError()}
          title="Erro no cadastro"
          description={registerError.message}
          variant="error"
        />
      )}
      <FormProvider {...createRegisterForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Form.Field>
            <Form.Label htmlFor="name">Nome Completo</Form.Label>
            <Form.Input id="name" type="text" name="name" placeholder="Digite seu nome completo" />
            <Form.ErrorMessage field="name" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input id="email" type="email" name="email" placeholder="Digite seu email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="birthDate">Data de Nascimento</Form.Label>
            <Form.Input id="birthDate" type="date" name="birthDate" placeholder="Digite sua data de nascimento" />
            <Form.ErrorMessage field="birthDate" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input id="password" type="password" name="password" placeholder="Digite sua senha" />
            <Form.ErrorMessage field="password" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="confirmPassword">Confirmar Senha</Form.Label>
            <Form.Input id="confirmPassword" type="password" name="confirmPassword" placeholder="Digite sua senha" />
            <Form.ErrorMessage field="confirmPassword" />
          </Form.Field>
          <button 
            type="submit" 
            disabled={registerPending}
            className={styles.submitButton}
          >
            {registerPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </FormProvider>
      <span>
        Já tem uma conta? <Link to="/login" search={{ registered: undefined }}>Faça login</Link>
      </span>
    </div>
  )
}
