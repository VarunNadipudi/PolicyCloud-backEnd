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

//defining the pcOrderTable 
let pcOrderTable = sequelize.define('pcOrderTable', {
  id : {
    primaryKey : true,
    type : Sequelize.INTEGER
  },
  planName : Sequelize.STRING,
  planCost : Sequelize.INTEGER,
  userEmail : Sequelize.STRING
},{
  timestamps : false,
  freezeTableName : true
});

// //creating the pcOrderTable 
// pcOrderTable.sync().then( ()=>{
//   console.log("pcOrderTable is created successfully!");
// })
// .catch( (error)=>{
//   console.log(error);
// })
// .finally( ()=>{
//   sequelize.close();
// });

module.exports = pcOrderTable;