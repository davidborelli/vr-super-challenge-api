import { Notificacao } from './../../domain/entidades/notificacao'
import { CasoDeUsoEnviaNotificacao } from './casoDeUsoEnviarNotificacao'

import { IRepositorioNotificacao } from './../../domain/repositorios/IRepositorioNotificacao'

class RepositorioMock implements IRepositorioNotificacao {
  mensagens = new Map<string, string>()

  salvarStatus(mensagemId: string, status: string): void {
    this.mensagens.set(mensagemId, status)
  }
  obterStatus(mensagemId: string): string | undefined {
    return this.mensagens.get(mensagemId)
  }
}

describe('CasoDeUsoEnviarNotificacao', () => {
  it("deve criar uma notificacao e salvar o status como 'AGUARDANDO_PROCESSAMENTO'", async () => {
    const repositorio = new RepositorioMock()
    const publicarMock = jest.fn().mockResolvedValue(undefined)

    const casoDeUso = new CasoDeUsoEnviaNotificacao(repositorio, publicarMock)

    const mensagemId = '123'
    const conteudoMensagem = 'Teste'

    const notificacao = await casoDeUso.executar(mensagemId, conteudoMensagem)

    expect(notificacao).toBeInstanceOf(Notificacao)
    expect(notificacao.mensagemId).toBe(mensagemId)
    expect(notificacao.conteudoMensagem).toBe(conteudoMensagem)
    expect(repositorio.obterStatus(mensagemId)).toBe('AGUARDANDO_PROCESSAMENTO')
    expect(publicarMock).toHaveBeenCalledWith(mensagemId, conteudoMensagem)
  })
})
