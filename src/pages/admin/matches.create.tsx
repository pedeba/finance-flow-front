import { createFileRoute } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../../components/form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckBox } from '../../components/radix/checkbox'
import { Select, SelectItem } from '../../components/radix/select'

export const Route = createFileRoute('/admin/matches/create')({
  component: CreateMatch,
})

const matchSchema = z.object({
  opponent: z.string().nonempty('Oponente é obrigatório'),
  is_home: z.boolean().optional(),
  match_date: z.string().nonempty('Data da partida é obrigatória'),
  competition: z.string().nonempty('Competição é obrigatória'),
  stadium: z.string().nonempty('Estádio é obrigatório'),
  status: z.string().nonempty('Status é obrigatório'),
  figueira_score: z.preprocess(
    (val) => (val === '' || val === undefined ? null : Number(val)),
    z.number().nullable(),
  ),
  opponent_score: z.preprocess(
    (val) => (val === '' || val === undefined ? null : Number(val)),
    z.number().nullable(),
  ),
})

type MatchSchemaType = z.infer<typeof matchSchema>

function CreateMatch() {
  const createMatchForm = useForm({
    resolver: zodResolver(matchSchema),
  })

  const {
    handleSubmit,
  } = createMatchForm;

  const onSubmit = (data: MatchSchemaType) => {
    console.log(data)
  }

  return (
    <div className="content-container">
      <h1>Criar Partida</h1>
      <div className='mt-4'>
      <FormProvider {...createMatchForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex row gap-4 justify-between mb-4'>
            <Form.Field className='flex-1'>
              <Form.Label htmlFor="opponent">Oponente*</Form.Label>
              <Form.Input id="opponent" type="text" name="opponent" placeholder="Digite o nome do oponente"/>
              <Form.ErrorMessage field="opponent" />
            </Form.Field>
            
            <Form.Field className='flex-1'>
              <Form.Label htmlFor="competition">Competição*</Form.Label>
              <Form.Input id="competition" type="text" name="competition" placeholder="Digite o nome do campeonato"/>
              <Form.ErrorMessage field="competition" />
            </Form.Field>
          </div>
          <div className='flex row gap-4 justify-between mb-4'>
            <Form.Field className='flex-1'>
              <Form.Label htmlFor="stadium">Estádio*</Form.Label>
              <Form.Input id="stadium" type="text" name="stadium" placeholder="Digite o nome do estádio"/>
              <Form.ErrorMessage field="stadium" />
            </Form.Field>
            <div className='flex-1 flex items-center'>
              <CheckBox id="is_home" label="Partida em casa" name="is_home" />
            </div>
          </div>
          <div className='flex row gap-4 justify-between mb-4'>
            <Form.Field className='flex-1'>
              <Form.Label htmlFor="match_date">Data e Hora*</Form.Label>
              <Form.Input id="match_date" type="datetime-local" name="match_date" placeholder="Digite a data e hora da partida"/>
              <Form.ErrorMessage field="match_date" />
            </Form.Field>
            <Form.Field className='flex-1'>
              <Form.Label htmlFor="status">Status*</Form.Label>
              <Select id="status" name="status" defaultValue="scheduled">
                <SelectItem value="scheduled">Agendada</SelectItem>
                <SelectItem value="finished">Encerrada</SelectItem>
                <SelectItem value="canceled">Cancelada</SelectItem>
              </Select>
              <Form.ErrorMessage field="status" />
            </Form.Field>
          </div>
          <div className='flex row gap-4 justify-between mb-4'>
            <Form.Field className='flex-1'>
              <Form.Label htmlFor="figueira_score">Gols da Figueira</Form.Label>
              <Form.Input id="figueira_score" type="number" name="figueira_score" />
              <Form.ErrorMessage field="figueira_score" />
            </Form.Field>
            
            <Form.Field className='flex-1'>
              <Form.Label htmlFor="opponent_score">Gols do Oponente</Form.Label>
              <Form.Input id="opponent_score" type="number" name="opponent_score" />
              <Form.ErrorMessage field="opponent_score" />
            </Form.Field>
          </div>
          <button 
            type="submit" 
          >
            Criar Partida
          </button>
        </form>
      </FormProvider>
      </div>
    </div>
  )
}
