import { Notificacao } from "./notificacao";

describe("NotificationEntity", () => {
  it("Deve criar uma notificação válida", () => {
    const mensagemId = "idValido";
    const conteudoMensagem = "Mensagem Válida";

    const notificacao = new Notificacao(mensagemId, conteudoMensagem);

    expect(notificacao.mensagemId).toBe(mensagemId);
    expect(notificacao.conteudoMensagem).toBe(conteudoMensagem);
  });
});
