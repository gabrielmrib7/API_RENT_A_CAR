
import serviceCliente from "../service/service.clientes.js";


async function listarClientes(req, res) {

    try {
        const clientes = await serviceCliente.listarClientes();
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

async function adicionarCliente(req, res) { 
    try {
        const novoCliente = req.body;
        const clienteAdicionado = await serviceCliente.adicionarCliente(novoCliente);
        res.status(201).json(clienteAdicionado); 
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    } 
}

export default {listarClientes, adicionarCliente};