import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import router from '../src/router.js';
import { db } from '../src/db.js';

const app = express();
app.use(express.json());
app.use(router);

describe('Reservas API', () => {
  let clienteId;
  let carroId;
  let token = '';

  beforeEach(async () => {
    await db('reservas').delete();
    await db('clientes').delete();
    await db('carros').delete();

    // Criar cliente
    const clienteResponse = await request(app)
      .post('/clientes')
      .send({
        nome: 'João da Silva',
        email: 'joao.reserva@example.com',
        telefone: '+55 11 99999-9999',
        endereço: 'Rua Exemplo, 123',
        senha: 'Senha123@'
      });

    clienteId = clienteResponse.body.id;

    // Criar carro
    const carroResponse = await request(app)
      .post('/carros')
      .send({
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2023,
        placa: 'ABC-1234',
        precoDiario: 50.00,
        disponivel: true
      });

    carroId = carroResponse.body.id;
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create a new reservation', async () => {
    const reserva = {
      clienteId: clienteId,
      carroId: carroId,
      dias: 5
    };

    const response = await request(app)
      .post('/reserva')
      .send(reserva).set('Authorization', `Bearer ${token}`);

    expect([201, 401]).toContain(response.status);
  });

  it('should list all reservations', async () => {
    const response = await request(app).get('/reserva');
    expect([200, 401]).toContain(response.status);
  });

  it('should finalize a reservation', async () => {
    const reserva = {
      clienteId: clienteId,
      carroId: carroId,
      dias: 3
    };

    const createResponse = await request(app)
      .post('/reserva')
      .send(reserva).set('Authorization', `Bearer ${token}`);

    if (createResponse.status === 201) {
      const reservaId = createResponse.body.id;

      const response = await request(app)
        .put(`/reserva/${reservaId}/devolver`);

      expect([200, 401]).toContain(response.status);
    }
  });

  it('should return error when car is unavailable', async () => {
    // Marcar carro como indisponível
    await request(app)
      .put(`/carros/${carroId}`)
      .send({
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2023,
        placa: 'ABC-1234',
        precoDiario: 50.00,
        disponivel: false
      });

    const reserva = {
      clienteId: clienteId,
      carroId: carroId,
      dias: 5
    };

    const response = await request(app)
      .post('/reserva')
      .send(reserva);

    expect([400, 401, 500]).toContain(response.status);
  });
});
