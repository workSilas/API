import * as db from '..//repository/turmaRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/turma/', async (req, resp) => {
    try {
        let registros = await db.consultarTurma()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/turma/', async (req, resp) => {
    try {
        let turma = req.body
        let id = await db.inserirTurma(turma)

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

endpoints.put('/turma/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let turma = req.body

        let linhasAfetadas = await db.alterarTurma(id, turma)
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

endpoints.delete('/turma/:id', async (req, resp) => {
    try {
        let id = req.params.id

        let linhasAfetadas = await db.removerTurma(id)
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

endpoints.get('/turma/consultaAno/', async (req, resp) => {
    try {
        let ano = req.query.ano

        let registros = await db.consultarTurmaAno(ano)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/turma/consultaAnoCusro/', async (req, resp) => {
    try {
        let ano =  req.query.ano
        let curso =  req.query.curso
        

        let registros = await db.consultarTurmaAnoCusro(ano, curso)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;