import { Sequelize } from "sequelize";

const db = new Sequelize("d2veulsjfo91cj", "dzkokplxmwbcix", "8b950cfa601103d6372ba176a66e4bf9e8dec2ed18f7a0d579a60f5201a19a22", {
    host:"postgres://dzkokplxmwbcix:8b950cfa601103d6372ba176a66e4bf9e8dec2ed18f7a0d579a60f5201a19a22@ec2-52-207-90-231.compute-1.amazonaws.com:5432/d2veulsjfo91cj",
    port:5432,
    dialect:"postgres",
    logging: false,
});
export default db; 