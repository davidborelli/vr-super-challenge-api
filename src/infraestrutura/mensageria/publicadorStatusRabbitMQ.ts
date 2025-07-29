import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()

export async function criarPublicadorStatusRabbitMQ(nomeFila: string) {
  const conexap = await amqp.connect(process.env.RABBITMQ_URL!)
  const canal = await conexap.createChannel()
  await canal.assertQueue(nomeFila)

  return async function publicarStatus(mensagemId: string, status: string) {
    const dados = JSON.stringify({ mensagemId, status })
    canal.sendToQueue(nomeFila, Buffer.from(dados))
  }
}
