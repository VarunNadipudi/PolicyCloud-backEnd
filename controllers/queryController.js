const pcQueryTable = require('../models/queryModel');

const insertQuery = (req,res)=>{
  //need to insert into pcQueryTable using Sequelize
  pcQueryTable.create({
    id : req.body.id,
    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone,
    company : req.body.company,
    message : req.body.message,
  })
  .then( ()=>{
    console.log("Query is inserted into the db successfully!");
    res.status(200).send("Query is added Successful!");
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });
}

module.exports = {
  insertQuery
};