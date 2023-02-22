import { Sequelize } from "sequelize";


const sequelize = new Sequelize('rrhh','root','Camila23*',{
    host:"34.28.92.71",
    dialect:'mysql',
});

export default sequelize;