const express = require('express')
var router = express.Router();
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const https = require('https');
const jwt = require('jsonwebtoken');
const cors = require("cors")
const con = require("./database.js");
const io = require('socket.io');
require('dotenv').config();
   
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(cors());

const TapPay = require('tappay-nodejs')

TapPay.initialize({
    partner_key: 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
    env: 'sandbox'
})


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({   extended: false    }));
router.use('/', express.static("views")) 
var prime = ''

router
    .get('/checkout.html', async(req,res) => {
        res.render('./checkout.html');
    })

    .post('/pay-by-prime',urlencodedParser, (req, res, next) =>    {
    
            var total = req.body.total
            var list = JSON.stringify(req.body.list)
            prime  = req.body.prime
            con.query(`INSERT INTO orderlist (name,phone,address,email,time,total,list,prime,status) VALUES (?,?,?,?,?,?,?,?,?)`,[req.body.name,req.body.phone,req.body.address,req.body.email,req.body.time,total,list,req.body.prime,'unpaid']);

            console.log('Successful1!');              
            const post_data = {
                "prime": req.body.prime,
                "partner_key": "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
                "merchant_id": "AppWorksSchool_CTBC",
                "amount": 1,
                "currency": "TWD",
                "details": "An apple and a pen.",
                "cardholder": {
                        "phone_number": req.body.phone,
                        "name": req.body.name,
                        "email": req.body.email,
                        "address": req.body.address
                    },
                    "remember": false
                }
                const post_options = {
                    host: 'sandbox.tappaysdk.com',
                    port: 443,
                    path: '/tpc/payment/pay-by-prime',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG'
                    }
                }
                const post_req = https.request(post_options, function(response) {
                    
                    response.on('data', function (body) {
                        var newbody = JSON.parse(body);
                        con.query(`UPDATE orderlist
                            SET status = 'paid',btrans_id = ?
                            WHERE prime=?`,[newbody.bank_transaction_id,prime])
                            console.log('Successful2!');

                        return res.json({
                            result: JSON.parse(body),
                        })
                    }); 

                });
                post_req.write(JSON.stringify(post_data));
                post_req.end(); 

 
    })

    // .post('/insertdata',urlencodedParser, (req, res, next) =>    {
    //         con.query(`INSERT INTO orderlist (total,list) VALUES (?,?)`,[total,list]);
    //     })


    .get('/order/data',urlencodedParser, (req, res) =>    {
        con.query(`SELECT total,list FROM orderlist`, (error,result) => {
            if(error) throw error;
            res.send(JSON.stringify(result));
        })
    })
module.exports = router;