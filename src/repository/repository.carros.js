import { db } from "../db.js";
import { Carro } from "../models/models.carros.js";

async function Listar() {
  const rows = await db('carros').select('*')
  return rows.map(row => Carro.fromDb(row))
}

async function ListarId(id) {
  const row = await db('carros').where({ id }).first()
  return row ? Carro.fromDb(row) : null
}

async function Adicionar(novoCarro) {
  const [novoCarroDb] = await db('carros')
    .insert(novoCarro)
    .returning('*')

  return Carro.fromDb(novoCarroDb)
}

async function Remover(id) {
  const [carro] = await db('carros')
    .where({ id })
    .returning('*')
    .del()

  return carro ? Carro.fromDb(carro) : null
}

async function Atualizar(id, dadosAtualizados) {
  const [carroAtualizado] = await db('carros')
    .where({ id })
    .update(dadosAtualizados)
    .returning('*')

  return carroAtualizado ? Carro.fromDb(carroAtualizado) : null
}

export default { Listar, Adicionar, Remover, Atualizar, ListarId }