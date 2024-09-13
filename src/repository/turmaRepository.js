import con from './connection.js'

export async function inserirTurma(turma) {
    const comando = `
    insert tb_turma (nm_turma, ds_curso, nr_ano_letivo, qtd_capacidade, bt_ativo, dt_inclusao) 
            values  (?, ?, ?, ?, ?, ?)
    `

    let resposta = await con.query(comando, [turma.nome, turma.curso, turma.anoLetivo, turma.capacidade, turma.ativo, turma.inclusao])
    let info = resposta[0]

    return info.insertId
}

export async function consultarTurma() {
    const comando = `
        select  nm_turma			turma,
                ds_curso			curso,
                nr_ano_letivo		anoLetivo,
                qtd_capacidade		capacidade,
                bt_ativo			ativo,
                dt_inclusao			inclusao
         from tb_turma;
    `

    let resposta = await con.query(comando)
    let registros = resposta[0]

    return registros
}

export async function alterarTurma(id, turma) {
    const comando = `
    update tb_turma 
       set  nm_turma = ?,
            ds_curso = ?,
            nr_ano_letivo = ?,
            qtd_capacidade = ?,
            bt_ativo = ?,
            dt_inclusao = ?			
     where  id_turma = ?;
    `

    let resposta = await con.query(comando, [turma.nome, turma.curso, turma.anoLetivo, turma.capacidade, turma.ativo, turma.inclusao, id])
    let info = resposta[0]

    return info.affectedRows
}

export async function removerTurma(id) {
    const comando = `
    delete 
      from tb_turma	
     where id_turma = ?;
    `

    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows
}