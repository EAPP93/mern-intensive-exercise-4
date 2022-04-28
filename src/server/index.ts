import express, { Express, Request, Response } from 'express'
// swagger
import swaggerUi from 'swagger-ui-express'
// security
import cors from 'cors'
import helmet from 'helmet'
// root router
import RootRouter from '../routes/index'
import mongoose from 'mongoose'

// create express app
const server: Express = express()

// swagger config and route
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
            explorer: true
        }
    })
)

// define server to use "/api" and use rootRouter from 'index.ts' in routes
server.use('/api', RootRouter)

// static server
server.use(express.static('public'))

// Mongo connection
mongoose.connect('mongodb://localhost:27017/intensive-mern')

// security config
server.use(cors())
server.use(helmet())

// content type
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// redirect to /api
server.get('/', (req:Request, res: Response) => {
    res.redirect('/api')
})

export default server
