import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { CasoDeUsoEnviaNotificacao } from '../../aplicacao/casos-de-uso/casoDeUsoEnviarNotificacao'
import { RepositorioNotificacaoEmMemoria } from '../../infraestrutura/repositorios/repositorioNotificacaoEmMemoria'
import { criarPublicadorRabbitMQ } from '../../infraestrutura/mensageria/publicadorRabbitMQ'

const rota = Router()

const repositorio = new RepositorioNotificacaoEmMemoria()
let casoDeUso: CasoDeUsoEnviaNotificacao
;(async () => {
  const publicar = await criarPublicadorRabbitMQ(
    'fila.notificacao.entrada.davidBorelli'
  )
  casoDeUso = new CasoDeUsoEnviaNotificacao(repositorio, publicar)
})()

rota.post('/', async (req: Request, res: Response) => {
  try {
    const mensagemId = req.body.mensagemId || uuidv4()
    const conteudoMensagem = req.body.conteudoMensagem

    const notificacao = await casoDeUso.executar(mensagemId, conteudoMensagem)

    return res.status(202).json({
      mensagemId: notificacao.mensagemId,
      status: 'AGUARDANDO_PROCESSAMENTO'
    })
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
})

rota.get('/status/:mensagemId', (req: Request, res: Response) => {
  const status = repositorio.obterStatus(req.params.mensagemId)

  if (!status) {
    return res.status(404).json({ erro: 'mensagemId não encontrado' })
  }

  return res.json({
    mensagemId: req.params.mensagemId,
    status
  })
})

export default rota
