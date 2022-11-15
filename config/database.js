import { Sequelize } from "sequelize";


const db=new Sequelize("sql12572413",'sql12572413','IdBkMKe69V',{
    host:"sql12.freesqldatabase.com",
    port:3306,
    dialect:"mysql",
    logging:false,
});

export default db; 