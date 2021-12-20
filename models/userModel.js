const Sequelize = require('sequelize');
const dbconfig = require('../db.config');

//creating a sequelize object with all the DB parameters to connect to it
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host : dbconfig.HOST,
  dialect : dbconfig.dialect,
  pool : {
    max : dbconfig.pool.max,
    min : dbconfig.pool.min,
    acquire : dbconfig.pool.acquire,
    idle : dbconfig.pool.idle
  }
});

//defining the userTable 
let pcUsersTable = sequelize.define('pcUsersTable',{
  id : {
    primaryKey : true,
    type : Sequelize.INTEGER
  },
  name : Sequelize.STRING,
  email : Sequelize.STRING,
  password : Sequelize.STRING
}, {
  timestamps : false,
  freezeTableName : true
});

// //creating the table
// pcUsersTable.sync().then( ()=>{
//   console.log("pcUsersTable is created successfully!");
// })
// .catch( (error)=>{
//   console.log(error);
// })
// .finally( ()=>{
//   sequelize.close();
// });

module.exports = pcUsersTable;