import express from "express"
import { getUsers, RegisterUsers, Login, Logout} from "../controller/UserController.js";
import { verifyToken } from "../middleware/auth.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { Cors } from "../middleware/Cors.js";

const Routes = express.Router();

Routes.get('/users', verifyToken, getUsers);
Routes.post('/users', Cors, RegisterUsers);
Routes.post('/login', Cors, Login);
Routes.get('/token', refreshToken);
Routes.delete('/logout', Logout);

export default Routes;