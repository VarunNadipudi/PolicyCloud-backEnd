const pcOrderTable = require('../models/orderModel');

const getAllItems = (req,res)=>{
  //send all the cart Items from db to the user
  pcOrderTable.findAll({raw:true}).then( (data)=>{
    // console.log("sending all the cart items");
    res.status(200).send(data);
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });
}

module.exports = {
  getAllItems
};