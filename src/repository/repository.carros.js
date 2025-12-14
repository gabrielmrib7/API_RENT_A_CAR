import { db } from "../db.js";
import { Carro } from "../models/models.carros.js";

async function Listar() {
    const rows = await db('carros').select('*');
    return rows.map(row => Carro.fromDb(row));
}

async function ListarId(id) {
    const row = await db('carros').select('*').where({ id }).first();
    return Carro.fromDb(row);
}

async function Adicionar(novoCarro) {
    const [id] = await db('carros').insert(novoCarro);
    const novoCarroDb = await db('carros').select('*').where({ id }).first();
    return Carro.fromDb(novoCarroDb);
}

async function Remover(id) {
    const carro = await db('carros').select('*').where({ id }).first();
    await db('carros').where({ id }).del();
    return carro ? Carro.fromDb(carro) : null;
}

async function Atualizar(id, dadosAtualizados) {
    await db('carros').where({ id }).update(dadosAtualizados);
    const carroAtualizado = await db('carros').select('*').where({ id }).first();
    return Carro.fromDb(carroAtualizado);
}

export default {Listar, Adicionar, Remover, Atualizar, ListarId};