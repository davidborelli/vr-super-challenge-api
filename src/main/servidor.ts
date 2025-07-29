import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rotaNotificar from './rotas/rotaNotificar'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/notificar', rotaNotificar)
const PORTA = process.env.PORTA || 3000

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`)
})
