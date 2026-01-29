import { createFileRoute, Link } from '@tanstack/react-router'
import styles from './auth-form.module.css'
import {useForm, FormProvider} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../../components/form'

export const Route = createFileRoute('/_auth/register')({
  component: Register,
  head: () => ({
    meta: [{ title: 'Cadastro | Finance Flow' }],
  }),
})

const registerSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string().nonempty('Confirmação de senha é obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres'),
})

type RegisterSchemaType = z.infer<typeof registerSchema>

function Register() {
  const createRegisterForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data)
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createRegisterForm;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro</h1>

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
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </FormProvider>
      <span>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </span>
    </div>
  )
}
