import { db } from "../db.js";
import { Reserva } from "../models/models.reservas.js";

async function Listar() {
  const reservas = await db('reservas').select('*');
  return reservas.map(row => Reserva.fromDb(row));
}

async function Adicionar(novaReserva) {
  const [reservaAdicionada] = await db('reservas')
    .insert(novaReserva)
    .returning('*');

  return Reserva.fromDb(reservaAdicionada);
}

async function Atualizar(id, dadosAtualizados) {
  const [reservaAtualizada] = await db('reservas')
    .where({ id })
    .update(dadosAtualizados)
    .returning('*');

  return reservaAtualizada ? Reserva.fromDb(reservaAtualizada) : null;
}

async function ListarId(id) {
  const reserva = await db('reservas').where({ id }).first();
  return reserva ? Reserva.fromDb(reserva) : null;
}

async function devolverCarro(id) {
  const [reservaFinalizada] = await db('reservas')
    .where({ id })
    .update({ status: 'finalizada' })
    .returning('*');

  return reservaFinalizada
    ? Reserva.fromDb(reservaFinalizada)
    : { mensagem: 'Reserva não encontrada' };
}

export default {Listar, Adicionar, Atualizar, ListarId, devolverCarro};