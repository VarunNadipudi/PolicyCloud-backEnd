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

//defining the pcQueryTable
let pcQueryTable = sequelize.define('pcQueryTable',{
  id : {
    primaryKey : true,
    type : Sequelize.INTEGER
  },
  name : Sequelize.STRING,
  email : Sequelize.STRING,
  phone : Sequelize.INTEGER,
  company : Sequelize.STRING,
  message : Sequelize.STRING
},{
  timestamps : false,
  freezeTableName : true
});

// //creating the pcQueryTable
// pcQueryTable.sync().then( ()=>{
//   console.log("pcQueryTable created successfully!");
// })
// .catch( (error)=>{
//   console.log(error);
// })
// .finally( ()=>{
//   sequelize.close();
// });

module.exports = pcQueryTable;