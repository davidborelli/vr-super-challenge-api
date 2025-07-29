import amqp from 'amqplib'

import { criarPublicadorRabbitMQ } from './publicadorRabbitMQ'

jest.mock('amqplib')

describe('PublicadorRabbitMQ', () => {
  it('deve conectar e enviar mensagem para a fila', async () => {
    const fakeChannel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn()
    }

    const fakeConnection = {
      createChannel: jest.fn().mockResolvedValue(fakeChannel)
    }

    ;(amqp.connect as jest.Mock).mockResolvedValue(fakeConnection)
    const publicar = await criarPublicadorRabbitMQ('fila.teste')

    await publicar('123', 'mensagem de teste')

    expect(fakeChannel.assertQueue).toHaveBeenCalledWith('fila.teste')
    expect(fakeChannel.sendToQueue).toHaveBeenCalledWith(
      'fila.teste',
      Buffer.from(
        JSON.stringify({
          mensagemId: '123',
          conteudoMensagem: 'mensagem de teste'
        })
      )
    )
  })
})
