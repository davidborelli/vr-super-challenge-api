import { Notificacao } from './notificacao'

describe('NotificationEntity', () => {
  it('Deve criar uma notificação válida', () => {
    const mensagemId = 'idValido'
    const conteudoMensagem = 'Mensagem Válida'

    const notificacao = new Notificacao(mensagemId, conteudoMensagem)

    expect(notificacao.mensagemId).toBe(mensagemId)
    expect(notificacao.conteudoMensagem).toBe(conteudoMensagem)
  })

  it('Deve lançar um erro se o conteúdo for vazio', () => {
    expect(() => {
      new Notificacao('idValido', '')
    }).toThrow('conteudoMensagem não pode ser vazio')
  })

  it('Deve lançar um erro se o conteudo for apenas espaços', () => {
    expect(() => {
      new Notificacao('validId', '    ')
    }).toThrow('conteudoMensagem não pode ser vazio')
  })
})
