

import repositoryCliente from "../repository/repository.clientes.js";
import bcrypt from 'bcrypt';



async function listarClientes() {
    const clientes = await repositoryCliente.listarClientes();
    return clientes;
}

async function listarId(id) {
    const cliente = await repositoryCliente.listarId(id);
    return cliente;
}

async function adicionarCliente(novoCliente) {
    const passwordHash = await bcrypt.hash(novoCliente.senha, 10);
    novoCliente.senha = passwordHash;
    const clienteAdicionado = await repositoryCliente.adicionarCliente(novoCliente);
    return clienteAdicionado;
}
async function Login(email, senha)
{
    const cliente = await repositoryCliente.ListarByEmail(email);
    if(cliente === null)
        return [];
    else{
        if(await bcrypt.compare(senha, cliente.senha))
        {
            delete cliente.senha;
            return cliente;
        }
        else{
            return [];
        }

    
    }
}

export default {listarClientes, adicionarCliente, listarId, Login};