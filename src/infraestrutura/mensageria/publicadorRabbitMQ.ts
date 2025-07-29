import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()

export async function criarPublicadorRabbitMQ(nomeFila: string) {
  const conexao = await amqp.connect(process.env.RABBITMQ_URL!)
  const canal = await conexao.createChannel()
  await canal.assertQueue(nomeFila)

  return async function publicar(mensagemId: string, conteudoMensagem: string) {
    const dados = JSON.stringify({ mensagemId, conteudoMensagem })
    canal.sendToQueue(nomeFila, Buffer.from(dados))
  }
}
