# VR Super Challenge API

Uma API de notificações construída com TypeScript, Express e RabbitMQ, seguindo princípios de Clean Architecture.

## 🚀 Funcionalidades

- **Envio de Notificações**: API REST para enviar notificações através de filas RabbitMQ
- **Consulta de Status**: Verificação do status de processamento das notificações
- **Arquitetura Limpa**: Implementação seguindo os princípios de Clean Architecture
- **Mensageria**: Integração com RabbitMQ para processamento assíncrono
- **Testes**: Cobertura de testes unitários com Jest

## 🏗️ Arquitetura

O projeto segue a Clean Architecture com as seguintes camadas:

```
src/
├── domain/           # Regras de negócio e entidades
├── aplicacao/        # Casos de uso da aplicação
├── infraestrutura/   # Implementações externas (RabbitMQ, repositórios)
└── main/            # Configuração e entrada da aplicação
```

### Estrutura de Camadas

- **Domain**: Contém as entidades de negócio (`Notificacao`) e interfaces dos repositórios
- **Aplicação**: Implementa os casos de uso (`CasoDeUsoEnviaNotificacao`)
- **Infraestrutura**: Implementações concretas para RabbitMQ e repositórios
- **Main**: Configuração do servidor Express e rotas

## 🛠️ Tecnologias

- **Node.js 18** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express** - Framework web
- **RabbitMQ** - Sistema de mensageria
- **Jest** - Framework de testes
- **Docker** - Containerização

## 📋 Pré-requisitos

- Node.js 18+
- Docker (opcional)
- Acesso ao RabbitMQ

## 🔧 Instalação

### Desenvolvimento Local

1. Clone o repositório:

```bash
git clone https://github.com/davidborelli/vr-super-challenge-api.git
cd vr-super-challenge-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Execute em modo desenvolvimento:

```bash
npm run dev
```

### Com Docker

1. Construa a imagem:

```bash
docker build -t vr-super-challenge-api .
```

2. Execute o container:

```bash
docker run -p 3000:3000 vr-super-challenge-api
```

## 🚀 Scripts Disponíveis

- `npm start` - Inicia a aplicação em produção
- `npm run dev` - Inicia em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript
- `npm test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch

## 📡 API Endpoints

### POST /api/notificar

Envia uma nova notificação para processamento.

**Request Body:**

```json
{
  "mensagemId": "uuid-opcional",
  "conteudoMensagem": "Conteúdo da notificação"
}
```

**Response (202):**

```json
{
  "mensagemId": "uuid-da-mensagem",
  "status": "AGUARDANDO_PROCESSAMENTO"
}
```

### GET /api/notificar/status/:mensagemId

Consulta o status de uma notificação específica.

**Response (200):**

```json
{
  "mensagemId": "uuid-da-mensagem",
  "status": "AGUARDANDO_PROCESSAMENTO"
}
```

**Response (404):**

```json
{
  "erro": "mensagemId não encontrado"
}
```

## 🔄 Fluxo de Processamento

1. **Envio**: Cliente envia notificação via POST `/api/notificar`
2. **Validação**: Sistema valida o conteúdo da mensagem
3. **Persistência**: Status é salvo como "AGUARDANDO_PROCESSAMENTO"
4. **Publicação**: Mensagem é enviada para fila RabbitMQ
5. **Processamento**: Consumidor processa a mensagem da fila
6. **Atualização**: Status é atualizado conforme o resultado

## 🧪 Testes

Execute os testes com:

```bash
npm test
```

Para executar em modo watch:

```bash
npm run test:watch
```

## 📦 Deploy

### Docker

```bash
# Construir imagem
docker build -t vr-super-challenge-api .

# Executar container
docker run -p 3000:3000 vr-super-challenge-api
```

### Variáveis de Ambiente

- `PORTA` - Porta do servidor (padrão: 3000)
- `RABBITMQ_URL` - URL de conexão com RabbitMQ
- `NODE_ENV` - Ambiente de execução
