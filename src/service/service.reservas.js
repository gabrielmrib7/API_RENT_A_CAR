import repositoryReservas from "../repository/repository.reservas.js";
import serviceCarros from "./service.carros.js";
import serviceClientes from "./service.clientes.js";

async function Listar() {
    const reservas = await repositoryReservas.Listar();
    return reservas;
}

async function Adicionar(reserva) {
    const cliente = await serviceClientes.listarId(reserva.clienteId);
    if (!cliente) {
        throw {status: 404, message : 'Cliente não encontrado!'};
    }
    const carro = await serviceCarros.ListarId(reserva.carroId);
    if (!carro) {
        throw {status: 404, message : 'Carro não encontrado!'};
    }
    if(!carro.disponivel){
        throw {status: 404, message : 'Carro não está disponível para reserva'};
    }
    await serviceCarros.Atualizar(carro.id, { disponivel: false });
    


    reserva.dataInicio = reserva.dataInicio ? new Date(reserva.dataInicio) : new Date();
    reserva.dataFim = new Date(reserva.dataInicio);
    reserva.dataFim.setDate(reserva.dataFim.getDate() + reserva.dias);
    reserva.precoTotal = reserva.dias * carro.precoDiario;

    const reservaAdicionada = await repositoryReservas.Adicionar(reserva);
    return reservaAdicionada;
}

async function Atualizar(id, dadosAtualizados) {
    const reservaAtualizada = await repositoryReservas.Atualizar(id, dadosAtualizados);
    return reservaAtualizada;
}

async function devolverCarro(id) {
    const reserva = await repositoryReservas.ListarId(id);
    if (!reserva) {
        throw {status: 404, message : 'Reserva não encontrada!'};
    }
    if(reserva.status === 'finalizada'){
        throw {status: 404, message : 'Reserva já foi finalizada'};
    }
    if(reserva.status === 'cancelada'){
        throw {status: 404, message : 'Reserva cancelada não pode ser finalizada'};
    }
    const carro = await serviceCarros.ListarId(reserva.carroId);
    if (!carro) {
        throw {status: 404, message : 'Carro não encontrado!'};
    }
    await serviceCarros.Atualizar(carro.id, { disponivel: true });
    await repositoryReservas.devolverCarro(id);
}

export default {Listar, Adicionar, devolverCarro, Atualizar};