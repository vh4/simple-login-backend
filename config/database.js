import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
    host:process.env.URL_DB,
    dialect:"postgres",
    logging: false,
});
export default db; 