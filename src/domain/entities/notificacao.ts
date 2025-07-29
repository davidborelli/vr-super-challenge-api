export class Notificacao {
  public readonly mensagemId: string;
  public readonly conteudoMensagem: string;

  constructor(mensagemId: string, conteudoMensagem: string) {
    this.mensagemId = mensagemId;
    this.conteudoMensagem = conteudoMensagem;
  }
}
