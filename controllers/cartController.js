const pcCartTable = require('../models/cartModel');
const pcOrderTable = require('../models/orderModel');
const nodemailer = require('nodemailer');

const insertItem = (req,res)=>{
  
  //need to insert the item into the pcCartTable using Sequelize
  pcCartTable.create({
    id : req.body.id,
    planName : req.body.planName,
    planCost : req.body.planCost,
    userEmail : req.body.userEmail
  })
  .then( ()=>{
    console.log("Item is inserted into the db successfully!");
    res.status(200).send("Added to cart Successful!");
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });
}

const getAllItems = (req,res)=>{
  //send all the cart Items from db to the user
  pcCartTable.findAll({raw:true}).then( (data)=>{
    // console.log("sending all the cart items");
    res.status(200).send(data);
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });
}

const deleteItem = (req,res)=>{
  //need to delete the given item with given id using Sequelize
  pcCartTable.destroy({
    where : { id : req.params.id}
  })
  .then( (data)=>{
    console.log("Number of items deleted are : "+data);
    res.status(200).send("Item will be removed from the cart!");
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });
}

const deleteAllItems = (req,res)=>{

  //html string that is send as an email
  var str = `<img src="../Images/customLogo.png" height="100" width="200"><h2>Hello ${req.body.userEmail} !</h2><p>Thankyou for choosing us for your Cloud Services.We at PolicyCloud are determined to provide uninterrupted cloud services at minimal costs.</p><p>Your order details are as follows</p><p>***********************************************************</p><table><tr><th>Plan Name</th><th>Plan Cost</th></tr>`;
  var cost = 0;

  //copy each of the cart item to order and make cart empty
  pcCartTable.findAll({
    where : { userEmail : req.body.userEmail}
  })
  .then( (data)=>{
    console.log(data);
    for(var i=0;i<data.length;i++){
      pcOrderTable.create({
        id : data[i].id,
        planName : data[i].planName,
        planCost : data[i].planCost,
        userEmail : data[i].userEmail
      })
      .then( ()=>{
        console.log("inserted successfully!");
      })
      .catch( (error)=>{
        console.log(error);
      });
      cost += data[i].planCost;
      str += `<tr><td>${data[i].planName}</td><td>   :   ₹ ${data[i].planCost}</td></tr>`;
    }

    str += `<tr><th>Total Cost</th><td>   :   ₹ ${cost}</td></tr></table><p>***********************************************************</p><h4>Regards</h4>PolicyCloud Team`;

    //before deleting all the cart items send the order details as email to the user!

    //need to send the email here about the successful signup
    var transporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
        user : 'varunnadipudi.vn@gmail.com',
        pass : 'baciochrmugwoofo'
      }
    });

    var mailOptions = {
      from : 'varunnadipudi.vn@gmail.com',
      to : req.body.userEmail,
      subject : 'Order summary!',
      html : str
    };

    transporter.sendMail(mailOptions, (error, info)=>{
      if(error) {
        console.log(error);
      }
      else{
        console.log('Email sent: ' + info.response);
      }
    });


    //deleting all the cart Items 
    pcCartTable.destroy({
      where : { userEmail : req.body.userEmail}
    })
    .then( (data)=>{
      console.log("Number of items deleted are : "+data);
      res.status(200).send("All Items are deleted");
    })
    .catch( (error)=>{
      console.log(error);
      res.status(400).send(error);
    });


  })
  .catch( (error)=>{
    console.log(error);
  });

}

module.exports = {
  insertItem,
  getAllItems,
  deleteItem,
  deleteAllItems
};