import serviceCarro from "../service/service.carros.js";

//Aqui fazemos o controle de requisições e respostas ao cliente

async function Listar(req, res) {

    try {
        const carros = await serviceCarro.Listar();
        res.status(200).json(carros);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
    
}

async function Adicionar(req, res) {

    try {
        const novoCarro = req.body;
        const carroAdicionado = await serviceCarro.Adicionar(novoCarro);
        res.status(201).json(carroAdicionado); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

async function Remover(req, res) {

    try {
        const { id } = req.params;
        await serviceCarro.Remover(id);
        res.status(204).end(); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

async function Atualizar(req, res) {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const carroAtualizado = await serviceCarro.Atualizar(id, dadosAtualizados);
        res.status(200).json(carroAtualizado); 
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export default {Listar, Adicionar, Remover, Atualizar};
