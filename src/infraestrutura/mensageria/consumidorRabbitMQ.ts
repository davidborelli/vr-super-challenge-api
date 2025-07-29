import amqp from 'amqplib'
import dotenv from 'dotenv'

import { RepositorioNotificacaoEmMemoria } from '../repositorios/repositorioNotificacaoEmMemoria'
import { criarPublicadorStatusRabbitMQ } from './publicadorStatusRabbitMQ'

dotenv.config()

const nomeFila = `fila.notificacao.entrada.davidBorelli`
const repositorio = new RepositorioNotificacaoEmMemoria()

export async function iniciaConsumidorRabbitMQ() {
  const conexao = await amqp.connect(process.env.RABBITMQ_URL!)
  const canal = await conexao.createChannel()
  await canal.assertQueue(nomeFila)

  console.log(`Aguardando mensagens em ${nomeFila}...`)

  const publicarStatus = await criarPublicadorStatusRabbitMQ(
    `fila.notificacao.status.davidBorelli`
  )

  canal.consume(nomeFila, async (mensagem) => {
    if (!mensagem) return

    const conteudo = mensagem.content.toString()
    const { mensagemId, conteudoMensagem } = JSON.parse(conteudo)

    console.log(`Mensagem recebida: ${mensagemId} | ${conteudoMensagem}`)

    const delay = 1000 + Math.random() * 1000
    await new Promise((resolve) => setTimeout(resolve, delay))

    const status =
      Math.random() <= 0.2 ? 'FALHA_PROCESSAMENTO' : 'PROCESSADO_SUCESSO'
    repositorio.salvarStatus(mensagemId, status)

    await publicarStatus(mensagemId, status)

    console.log(`Processamento finalizado para  ${mensagemId}: ${status}`)
    canal.ack(mensagem)
  })
}
