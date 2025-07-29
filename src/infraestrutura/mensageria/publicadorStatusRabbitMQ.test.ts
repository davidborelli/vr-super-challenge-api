import { criarPublicadorStatusRabbitMQ } from './publicadorStatusRabbitMQ'
import amqp from 'amqplib'

jest.mock('amqplib')

describe('PublicadorStatusRabbitMQ', () => {
  it('deve conetar e publicar o status na fila corretamente', async () => {
    const canalFalso = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn()
    }

    const conexaoFalsa = {
      createChannel: jest.fn().mockResolvedValue(canalFalso)
    }

    ;(amqp.connect as jest.Mock).mockResolvedValue(conexaoFalsa)

    const nomeFila = 'fila.teste'
    const publicarStatus = await criarPublicadorStatusRabbitMQ(nomeFila)

    const mensagemId = '123AB'
    const status = 'PROCESSADO_SUCESSO'

    await publicarStatus(mensagemId, status)

    expect(canalFalso.assertQueue).toHaveBeenCalledWith(nomeFila)
    expect(canalFalso.sendToQueue).toHaveBeenCalledWith(
      nomeFila,
      Buffer.from(JSON.stringify({ mensagemId, status }))
    )
  })
})
