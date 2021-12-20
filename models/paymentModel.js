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

//defining the pcPaymentTable
let pcPaymentTable = sequelize.define('pcPaymentTable', {
  cardNumber : Sequelize.STRING,
  expiry : Sequelize.STRING,
  cvv : Sequelize.INTEGER,
  country : Sequelize.STRING,
  address : Sequelize.STRING,
  orderCost : Sequelize.INTEGER,
  userEmail : Sequelize.STRING
},{
  timestamps : false,
  freezeTableName : true
});

// //creating the table
// pcPaymentTable.sync().then( ()=>{
//   console.log("pcPaymentTable created successfullY!");
// })
// .catch( (error)=>{
//   console.log(error);
// })
// .finally( ()=>{
//   sequelize.close();
// });

module.exports = pcPaymentTable;