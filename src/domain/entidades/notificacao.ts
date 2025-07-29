export class Notificacao {
  public readonly mensagemId: string
  public readonly conteudoMensagem: string

  constructor(mensagemId: string, conteudoMensagem: string) {
    if (!conteudoMensagem || conteudoMensagem.trim() === '') {
      throw new Error('conteudoMensagem não pode ser vazio')
    }

    this.mensagemId = mensagemId
    this.conteudoMensagem = conteudoMensagem
  }
}
