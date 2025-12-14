import { db } from "../db.js";
import { Cliente } from "../models/models.clientes.js";

async function listarClientes() {
    const rows = await db('clientes').select('*');
    return rows.map(row => Cliente.fromDb(row));
}
async function listarId(id) {
    const row = await db('clientes').select('*').where({ id }).first();
    return Cliente.fromDb(row);
}

async function adicionarCliente(novoCliente) {  
    const cliente = new Cliente(novoCliente);
    cliente.validate();
    const [id] = await db('clientes').insert(cliente.toDb());
    const novoClienteDb = await db('clientes').select('*').where({ id }).first();
    return Cliente.fromDb(novoClienteDb);
}

async function ListarByEmail(email) {
    const row =  await db('clientes').select('*').where({ email }).first();
    return Cliente.fromDb(row);
}

export default {listarClientes, adicionarCliente, listarId, ListarByEmail};