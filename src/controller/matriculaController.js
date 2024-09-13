import * as db from '../repository/matriculaRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/matricula/', async (req, resp) => {
    try {
        let registros = await db.consultarmatricula()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/matricula/', async (req, resp) => {
    try {
        let matricula = req.body
        let id = await db.inserirmatricula(matricula)

        resp.send({
            novoID: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/matricula/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let matricula = req.body

        let linhasAfetadas = await db.alterarmatricula(id, matricula)
        if (linhasAfetadas >= 1) {
            resp.send()
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/matricula/:id', async (req, resp) => {
    try {
        let id = req.params.id

        let linhasAfetadas = await db.removermatricula(id)
        if (linhasAfetadas >= 1) {
            resp.send()
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;