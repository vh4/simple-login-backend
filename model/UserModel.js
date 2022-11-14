import db from "../config/database.js";
import { DataTypes } from "sequelize";

const Users = db.define('users', {
    name:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING,
    },
    refresh_token:{
        type:DataTypes.TEXT,
        allowNull:true
    },
}, {
    freezeTableName:true,
    timestamps: true
})

export default Users;