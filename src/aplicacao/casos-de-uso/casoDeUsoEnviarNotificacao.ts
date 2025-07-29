import { Notificacao } from './../../domain/entidades/notificacao'

import { IRepositorioNotificacao } from './../../domain/repositorios/IRepositorioNotificacao'
export class CasoDeUsoEnviaNotificacao {
  constructor(
    private readonly repositorio: IRepositorioNotificacao,
    private readonly publicar: (
      mensagemId: string,
      conteudoMensagem: string
    ) => Promise<void>
  ) {}

  async executar(
    mensagemId: string,
    conteudoMensagem: string
  ): Promise<Notificacao> {
    const notificacao = new Notificacao(mensagemId, conteudoMensagem)
    await this.publicar(mensagemId, conteudoMensagem)
    this.repositorio.salvarStatus(mensagemId, 'AGUARDANDO_PROCESSAMENTO')
    return notificacao
  }
}
