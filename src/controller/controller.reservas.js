//Controller reservas

import serviceReservas from "../service/service.reservas.js";

async function Listar(req, res) {

    try {
        const reservas = await serviceReservas.Listar();
        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

async function Adicionar(req, res) {
    try {
        const novaReserva = req.body;
        const reservaAdicionada = await serviceReservas.Adicionar(novaReserva);
        res.status(201).json(reservaAdicionada); 
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

async function Remover(req, res) {
    // Implementar remoção de reserva
}

async function Atualizar(req, res) {
    // Implementar atualização de reserva
}

async function devolverCarro(req, res) {
    try{
        const { id } = req.params;
        await serviceReservas.devolverCarro(id);
        res.status(200).json({ message: 'Carro devolvido com sucesso' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export default {Listar, Adicionar, Remover, devolverCarro, Atualizar};