import express from "express"
import { getUsers, RegisterUsers, Login, Logout} from "../controller/UserController.js";
import { verifyToken } from "../middleware/auth.js";
import { refreshToken } from "../controller/RefreshToken.js";
const Routes = express.Router();

Routes.get('/users', verifyToken, getUsers);
Routes.post('/users', RegisterUsers);
Routes.post('/login', Login);
Routes.get('/token', refreshToken);
Routes.delete('/logout', Logout);

export default Routes;