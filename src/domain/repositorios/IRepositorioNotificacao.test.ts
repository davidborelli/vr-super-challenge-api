import { IRepositorioNotificacao } from './IRepositorioNotificacao'

class RepositorioFake implements IRepositorioNotificacao {
  private mensagens = new Map<string, string>()

  salvarStatus(mensagemId: string, status: string): void {
    this.mensagens.set(mensagemId, status)
  }

  obterStatus(mensagemId: string): string | undefined {
    return this.mensagens.get(mensagemId)
  }
}

describe('IRespositorioNotificacao', () => {
  it('Deve salvar e recuperar o status de uma mensagem ', () => {
    const repo = new RepositorioFake()

    const ID = 'idValido'
    const STATUS = 'AGUARDANDO_PROCESSAMENTO'

    repo.salvarStatus(ID, STATUS)
    const status = repo.obterStatus('idValido')

    expect(status).toBe(STATUS)
  })

  it('Deve retornar undefined se a mensagem não existir', () => {
    const repo = new RepositorioFake()

    const status = repo.obterStatus('nao-existe')
    expect(status).toBeUndefined()
  })
})
