import { IRepositorioNotificacao } from './../../domain/repositorios/IRepositorioNotificacao'
export class RepositorioNotificacaoEmMemoria
  implements IRepositorioNotificacao
{
  private mensagens = new Map<string, string>()

  salvarStatus(mensagemId: string, status: string): void {
    this.mensagens.set(mensagemId, status)
  }
  obterStatus(mensagemId: string): string | undefined {
    return this.mensagens.get(mensagemId)
  }
}
