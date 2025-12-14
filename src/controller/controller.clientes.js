
import serviceCliente from "../service/service.clientes.js";
import jwt from "../middleware/middleware.token.js";


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

async function Login(req, res) {
    try {
        const { email, senha } = req.body;


        const cliente = await serviceCliente.Login(email, senha);

        if (cliente === null || cliente.length === 0) {
            return res.status(404).json({ erro: "Email ou senha invalido" });
        }

        // aqui você pode validar a senha depois
        const token = jwt.CreateJWT(cliente.id);
        cliente.token = token;
        res.status(200).json({ cliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export default {listarClientes, adicionarCliente, Login};