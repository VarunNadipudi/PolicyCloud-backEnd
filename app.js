const express = require('express');
const cors = require('cors');
const user = require('./routes/userRoute');
const cart = require('./routes/cartRoute');
const order = require('./routes/orderRoute');
const PORT = 8000;

const app = express();
app.use(cors());

app.use('/user', user);   
app.use('/cart', cart);
app.use('/order', order);

app.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`);
});


