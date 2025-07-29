import { RepositorioNotificacaoEmMemoria } from './repositorioNotificacaoEmMemoria'

describe('RepositorioNotificacaoEmMemoria', () => {
  it('Deve salvar e recuperar o status corretamente', () => {
    const repo = new RepositorioNotificacaoEmMemoria()

    repo.salvarStatus('1', 'AGUARDANDO_PROCESSAMENTO')
    expect(repo.obterStatus('1')).toBe('AGUARDANDO_PROCESSAMENTO')
  })

  it('Deve retornar undefined se mensagem não existir', () => {
    const repo = new RepositorioNotificacaoEmMemoria()

    expect(repo.obterStatus('inexistente')).toBeUndefined()
  })
})
