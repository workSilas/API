import con from './connection.js'

export async function inserirMatricula(matricula) {
    const comando = `
    insert tb_matricula_aluno (nm_aluno, ds_sexo, dt_nascimento, ds_email, bt_ativo, turma_id) 
    values                    (?, ?, ?, ?, ?, ?);
    `

    let resposta = await con.query(comando, [matricula.nome, matricula.sexo, matricula.nascimento, matricula.email, matricula.ativo, matricula.turma])
    let info = resposta[0]

    return info.insertId
}

export async function consultarMatricula() {
    const comando = `
        select  id_matricula    id,
                nm_aluno		nome,
                ds_sexo			sexo,
                dt_nascimento	nascimento,
                ds_email 		email,
                bt_ativo		ativo,
                turma_id		turma
        from tb_matricula_aluno;
    `

    let resposta = await con.query(comando)
    let registros = resposta[0]

    return registros
}

export async function alterarMatricula(id, matricula) {
    const comando = `
    update  tb_matricula_aluno 
       set  nm_aluno            = ?,
            ds_sexo             = ?,
            dt_nascimento       = ?,
            ds_email            = ?,
            bt_ativo            = ?,
            turma_id            = ?			
     where  id_matricula        = ?;
    `

    let resposta = await con.query(comando, [matricula.nome, matricula.curso, matricula.anoLetivo, matricula.capacidade, matricula.ativo, matricula.inclusao, id])
    let info = resposta[0]

    return info.affectedRows
}

export async function removerMatricula(id) {
    const comando = `
    delete 
      from tb_matricula_aluno	
     where id_matricula         = ?;
    `

    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows
}