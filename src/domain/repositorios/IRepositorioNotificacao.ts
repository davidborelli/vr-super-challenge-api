export interface IRepositorioNotificacao {
  salvarStatus(mensagemId: string, status: string): void
  obterStatus(mensagemId: string): string | undefined
}
