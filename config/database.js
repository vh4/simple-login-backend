import { Sequelize } from "sequelize";

const db = new Sequelize("backend_fullstack", "root", "", {
    host:"localhost",
    dialect:"mysql"
});

export default db;