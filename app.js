const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');

// MongoDB Connection
const mongo = require('./db/connection')


const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');



app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Acess-Control-Allow-Origin","*");
    res.header("Acess-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// app.use('/',(req, res, next) => {
//     res.status(200).json({
//         message: 'It works'
//     })
// })








app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400 ;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});





//........................Connections...........................

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;