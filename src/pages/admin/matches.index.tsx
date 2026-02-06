import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Table } from '../../components/table'
import {keepPreviousData, useQuery} from '@tanstack/react-query'
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter'
import { EllipsisVerticalIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { z } from 'zod'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from "../../components/radix/dropdown-menu";

const matchesSearchSchema = z.object({
  _page: fallback(z.number(), 1).default(1),
  _limit: fallback(z.literal(5), 5).default(5),
})

export const Route = createFileRoute('/admin/matches/')({
  component: Matches,
  validateSearch: zodSearchValidator(matchesSearchSchema),
  
})

function Matches() {
  const { _page, _limit } = Route.useSearch()
  const navigate = useNavigate()
  const {data: matches, isFetching} = useQuery({
    queryKey: ['matches', _page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/matches?_page=${_page}&_limit=${_limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch matches')
      }
      const data = await response.json()
      return data
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData
  })

  if (!matches) return <div>Sem Dados</div>
  return (
    <div className="content-container">
      <h1>Partidas</h1>
      <div className='mt-4'>
        <button onClick={() => navigate({ to: '/admin/matches/create' })} className='btn-accent mb-4'>
          <PlusIcon size={16} /> Criar Partida
        </button>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Opoenente</Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>Em Casa</Table.Cell>
              <Table.Cell>Data da Partida</Table.Cell>
              <Table.Cell>Ações</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {matches.map((match: any) => (
              <Table.Row key={match.id}>
                <Table.Cell>{match.opponent}</Table.Cell>
                <Table.Cell>{match.status}</Table.Cell>
                <Table.Cell>{match.is_home ? 'Sim' : 'Não'}</Table.Cell>
                <Table.Cell>{match.match_date}</Table.Cell>
                <Table.Cell>
                <DropdownMenu>
                  <DropdownMenuTrigger><EllipsisVerticalIcon size={16} /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => navigate({ to: '/admin/matches/$match/edit', params: { match: match.id } })}>
                      <PencilIcon size={16} /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="danger"><TrashIcon size={16} /> Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={5}>
                {isFetching ? <div>Carregando...</div> : <Table.Pagination page={_page}/>}
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </div>
    </div>
  )
}
