import { Router } from "express";
import controllerCarros from "./controller/controller.carros.js";
// import controllerClientes from "./controller/controller.clientes.js";
// import controllerReservas from "./controller/controller.reservas.js";  


//Aqui definimos as rotas da aplicação e chamamos os controllers correspondentes
const router = Router();

router.get('/carros', controllerCarros.Listar);
router.post('/carros', controllerCarros.Adicionar);
router.delete('/carros/:id', controllerCarros.Remover);
router.put('/carros/:id', controllerCarros.Atualizar);

// router.get('/clientes', controllerClientes.listarClientes);
// router.post('/clientes', controllerClientes.adicionarCliente);
// router.delete('/clientes/:id', controllerClientes.removerCliente);
// router.put('/clientes/:id', controllerClientes.atualizarCliente);

// router.get('/aluguel', controllerAlugueres.listarAlugueres);
// router.post('/aluguel', controllerAlugueres.adicionarAluguer);
// router.delete('/aluguel/:id', controllerAlugueres.removerAluguer);
// router.put('/aluguel/:id/devolver', controllerAlugueres.devolverCarro);



export default router;