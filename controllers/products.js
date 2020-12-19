const mongoose = require('mongoose');

const db = require("../models");

exports.products_get_all = (req, res, next ) => {
    db.product.find()
    .select("name price _id productImage")
    .exec()
    .then (docs => {
        const responce ={
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id : doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        };
        // if (docs.length >= 0){
        res.status(200).json(responce);
        // }else{
        //     res.status(404).json({
        //         message: 'No entries Found'
        //     });
        // }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


//can be done also as following

// router.get('/',async (req, res, next) => {
//     try {
//         alldata = await db.product.find()
//         res.status(200).json({
//             product: alldata,
//             message: 'Total Products Fetched'
//         });

//     }
//     catch(error){
//         res.status(500).json({
//             error: error.message
//         });
//     }
// });


exports.products_create_product = (req, res, next) => {
    const product = new db.product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path.replace(/\\/g, '/')
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created Product Successfully',
            createdProduct : {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });    
}

exports.products_get_product = (req, res,next) => {
    const id = req.params.productId;
    db.product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("From Database",doc);
        if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/products'
                }
            });
        } else{
            res
            .status(404)
            .json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.products_update_product = (req, res,next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    db.product.update({ _id: id}, {$set: updateOps})
    .exec()
    .then (result => {
        res.status(200).json({
            message: "Product updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.products_delete_product = (req, res,next) => {
    const id = req.params.productId;
    db.product.remove({_id: id})
    .exec()
     .then (result => {
         console.log(result);
         res.status(200).json({
             message: 'Product deleted',
             request: {
                 type: 'POST',
                 url: 'http://localhost:3000/products',
                 body: { name: 'String', price: 'Number'}
             }
         });
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error: err
         });
     });
 }