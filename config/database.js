import { Sequelize } from "sequelize";

const db = new Sequelize("postgres://iwjajeqcegodee:127ddf46d98b19d7c7e28ad5455779bf6f2d79ee20f53205c8867d5745e24f69@ec2-52-200-5-135.compute-1.amazonaws.com:5432/dcqn1bupdnue4m", {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

export default db; 