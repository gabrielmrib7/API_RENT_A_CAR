import { db } from "../db.js";
import { Reserva } from "../models/models.reservas.js";

async function Listar() {
    const reservas = await db('reservas').select('*');
    return reservas.map(row => Reserva.fromDb(row));
}

async function Adicionar(novaReserva) {
    const [id] = await db('reservas').insert(novaReserva);
    const reservaAdicionada = await db('reservas').select('*').where({ id }).first();
    return Reserva.fromDb(reservaAdicionada);
}

async function Atualizar(id, dadosAtualizados) {
    await db('reservas').where({ id }).update(dadosAtualizados);
    const reservaAtualizada = await db('reservas').select('*').where({ id }).first();
    return Reserva.fromDb(reservaAtualizada);
}

async function ListarId(id) {
    const reserva = await db('reservas').select('*').where({ id }).first();
    return reserva ? Reserva.fromDb(reserva) : null;
}

async function devolverCarro(id) {
    await db('reservas').where({ id }).update({ status: 'finalizada' });
    return { mensagem: 'Carro devolvido com sucesso' };
}

export default {Listar, Adicionar, Atualizar, ListarId, devolverCarro};