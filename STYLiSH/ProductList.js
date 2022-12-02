var express = require('express');
var router = express.Router();
const con = require("./database.js");
const bodyparser = require('body-parser');
require('dotenv').config();

router.get('/', function(req, res) {
      res.send('halo');
});

router.get('/all/product', function(req, res) {
    var offset=6*req.query.paging;
    con.query(`SELECT * FROM  product order by ? limit 6 offset ${offset}`, 'p_id' , (error,result) => {
        if(error) throw error;
        res.send(JSON.stringify(result));
    })
});

router
    .get('/product/search', (req,res) => {
        con.query(`SELECT * FROM product WHERE name LIKE N'%${req.query.keyword}%'`, 'p_id', (error,result) => {
            if(error) throw error;
            res.send(JSON.stringify(result));
        })
    })
    .get("/product/:category", (req,res) => {
        if(req.query.paging==null){
            con.query(`SELECT * FROM product WHERE category = ?`, `${req.params.category}`, (error,result) => {
                if(error) throw error;
                res.send(JSON.stringify(result));
                })
        }else{
            var offset=6*req.query.paging;
            con.query(`SELECT * FROM product WHERE category = '${req.params.category}' order by ? limit 6 offset ${offset}`, 'p_id', (error,result) => {
            if(error) throw error;
            res.send(JSON.stringify(result));
            })
        }        
    })
    .get('/product/details/:id', (req,res) => {
        con.query(`SELECT * FROM product inner join inventory on product.p_id = inventory.p_id AND inventory.p_id = ?`, req.params.id, (error,result) => {
            if(error) throw error;
            res.send(JSON.stringify(result));
        })
    })

module.exports = router;