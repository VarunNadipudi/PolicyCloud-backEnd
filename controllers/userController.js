const pcUsersTable = require('../models/userModel');
const pcPaymentTable = require('../models/paymentModel');
const nodemailer = require('nodemailer');

const validateUser = (req,res)=>{

  //need to validate the given user with db user using Sequelize
  pcUsersTable.findAll({
    where : {
      email : req.body.email,
      password : req.body.password
    },
    raw : true
  })
  .then( (data)=>{
    res.status(200).send(data);
    // if(data != null){
    //   console.log("Valid User");
    //   res.status(200).send(data);
    // }
    // else{
    //   console.log("Invalid User");
    //   res.status(200).send(data);
    // }
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });

}

const registerUser = (req,res)=>{
  //need to insert the user into the database using Sequelize
  pcUsersTable.create({
    id : req.body.id,
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  })
  .then( ()=>{
    console.log("User is inserted into the db successfully!");
    res.status(200).send("Sign up Successful!");

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
      to : req.body.email,
      subject : 'Account created successfully, Welcome to PolicyCloud!',
      html : `<img src="https://www.seekpng.com/png/detail/1-12928_cloud-png-blue-cloud-png-hd.png" height="100" width="200"><h3>Hello ${req.body.email}!</h3><p>Thankyou for choosing us for your Cloud Services.</p><p>We at PolicyCloud are determined to provide uninterrupted cloud services at minimal costs!. Checkout our top-notch plans at the minimum cost which suits all the requirements.</p><h5>Regards</h5>PolicyCloud Team`
      // text : 'Hello Varun from PolicyCloud'
    };

    transporter.sendMail(mailOptions, (error, info)=>{
      if(error) {
        console.log(error);
      }
      else{
        console.log('Email sent: ' + info.response);
      }
    });

  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });

}

const userExists = (req,res)=>{
  pcUsersTable.findAll({
    where : { email : req.body.email},
    raw : true
  })
  .then( (data)=>{
    if(data.length == 1){
      res.status(200).send("true");
    }
    else{
      res.status(200).send("false");
    }

  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });

}

const updateProfile = (req,res)=>{
  //need to update the profile of the given user in DB using Sequelize
  pcUsersTable.update(
    { name : req.body.name, email : req.body.email, password : req.body.password},
    { where : { id : req.body.id}}
  )
  .then( (data)=>{
    console.log("Number of users updated are : "+data);
    res.status(200).send("User updated successfully!");
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  });
}





//************************************************************************ */
const payment = (req,res)=>{
  //need to add the body data into the pcPaymentTable using Sequelize
  pcPaymentTable.create({
    id : req.body.id,
    cardNumber : req.body.cardNumber,
    expiry : req.body.expiry,
    cvv : req.body.cvv,
    country : req.body.country,
    address : req.body.address,
    orderCost : req.body.orderCost,
    userEmail : req.body.userEmail
  })
  .then( ()=>{
    console.log("Data inserted successfully!");
    res.status(200).send("Payment successful!");
  })
  .catch( (error)=>{
    console.log(error);
    res.status(400).send("Payment failed!");
  });
}


module.exports = {
  validateUser,
  registerUser,
  userExists,
  updateProfile,
  payment
};