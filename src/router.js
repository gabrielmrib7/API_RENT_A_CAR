import { Router } from "express";
import controllerCarros from "./controller/controller.carros.js";
import controllerClientes from "./controller/controller.clientes.js";
import controllerReservas from "./controller/controller.reservas.js";  
import jwt from "./middleware/middleware.token.js";


//Aqui definimos as rotas da aplicação e chamamos os controllers correspondentes
const router = Router();

router.get('/carros', jwt.ValidateJWT, controllerCarros.Listar);
router.post('/carros', jwt.ValidateJWT, controllerCarros.Adicionar);
router.delete('/carros/:id', jwt.ValidateJWT, controllerCarros.Remover);
router.put('/carros/:id', jwt.ValidateJWT,controllerCarros.Atualizar);

router.get('/clientes', jwt.ValidateJWT, controllerClientes.listarClientes);
router.post('/clientes', controllerClientes.adicionarCliente);
router.post('/clientes/login', controllerClientes.Login);
// router.delete('/clientes/:id', controllerClientes.removerCliente);
// router.put('/clientes/:id', controllerClientes.atualizarCliente);

router.get('/reserva', jwt.ValidateJWT, controllerReservas.Listar);
router.post('/reserva', jwt.ValidateJWT, controllerReservas.Adicionar);
// router.delete('/reserva/:id', controllerReservas.Remover);
// router.put('/reserva/:id', controllerReservas.Atualizar);
router.put('/reserva/:id/devolver', jwt.ValidateJWT, controllerReservas.devolverCarro);


export default router;