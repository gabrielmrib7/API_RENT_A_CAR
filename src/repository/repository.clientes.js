import { db } from "../db.js";
import { Cliente } from "../models/models.clientes.js";

async function listarClientes() {
  const rows = await db('clientes').select('*')
  return rows.map(row => Cliente.fromDb(row))
}

async function listarId(id) {
  const row = await db('clientes').where({ id }).first()
  return row ? Cliente.fromDb(row) : null
}

async function adicionarCliente(novoCliente) {  
  const cliente = new Cliente(novoCliente)

  const [novoClienteDb] = await db('clientes')
    .insert(cliente.toDb())
    .returning('*')

  return Cliente.fromDb(novoClienteDb)
}

async function ListarByEmail(email) {
  const row = await db('clientes').where({ email }).first()
  return row ? Cliente.fromDb(row) : null
}

export default {listarClientes, adicionarCliente, listarId, ListarByEmail};