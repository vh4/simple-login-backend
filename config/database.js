import { Sequelize } from "sequelize";

const db = new Sequelize("backend_fullstack", "root", "", {
    host:"localhost",
    dialect:"postgres"
});

export default db;