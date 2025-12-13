import { db } from "../db.js";
import { Carro } from "../models/models.carros.js";

//Aqui fazemos a comunicação direta com o banco de dados

async function Listar() {
    const rows = await db('carros').select('*');
    return rows.map(row => Carro.fromDb(row));
}

async function Adicionar(novoCarro) {
    const carro = new Carro(novoCarro);
    carro.validate();
    const [id] = await db('carros').insert(carro.toDb());
    const novoCarroDb = await db('carros').select('*').where({ id }).first();
    return Carro.fromDb(novoCarroDb);
}

async function Remover(id) {
   
    await db('carros').where({ id }).del();

}

async function Atualizar(id, dadosAtualizados) {
    const carro = new Carro(dadosAtualizados);
    carro.validate();
    await db('carros').where({ id }).update(carro.toDb());
    const carroAtualizado = await db('carros').select('*').where({ id }).first();
    return Carro.fromDb(carroAtualizado);
}

export default {Listar, Adicionar, Remover, Atualizar};