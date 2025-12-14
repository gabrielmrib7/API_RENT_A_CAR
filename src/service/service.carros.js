import repositoryCarros from "../repository/repository.carros.js";

//Aqui fazemos as regras de negocio antes de chamar o repositório

async function Listar() {
    const carros = await repositoryCarros.Listar();
    return carros;
}

async function ListarId(id)
{
    const carros = await repositoryCarros.ListarId(id);
    return carros;
}

async function Adicionar(novoCarro) {
    const carroAdicionado = await repositoryCarros.Adicionar(novoCarro);
    return carroAdicionado;
}

async function Remover(id) {
    const idNum = parseInt(id);
    const carroRemovido = await repositoryCarros.Remover(idNum);
    return carroRemovido;
}

async function Atualizar(id, dadosAtualizados) {
    const carroAtualizado = await repositoryCarros.Atualizar(id, dadosAtualizados);
    return carroAtualizado;
}

export default {Listar, Adicionar, Remover, Atualizar, ListarId};