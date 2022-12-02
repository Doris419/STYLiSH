var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require("./database.js");
const cors = require("cors")
require('dotenv').config();


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(cors());
router
    .get('/user/SignUp.html', (req,res) => {
        res.render('./SignUp.html');
        })
    .post('/user/SignUp',urlencodedParser, (req,res) => {
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email; 
      const password_hash=bcrypt.hashSync(`${password}`, 10);
      console.log(password_hash);
      con.query(`SELECT * FROM user WHERE email = ?`, email , function (err, rows) {
        if (rows[0] === undefined) {
          con.query(`INSERT INTO user (name,password,email) VALUES ('${username}','${password_hash}','${email}')`);
          res.send('Successful!');
        } else {
          res.send('Email is already used!');
        }
      })
  
      })
    .get('/user/SignIn.html', (req,res) => {
        res.render('./SignIn.html');
        })

    .post('/user/SignIn', urlencodedParser, (req,res) => {
        con.query(`SELECT * FROM user WHERE email = ?`, req.body.email , function (err, rows) {
          if (rows[0] === undefined) {
            res.send("The account doesn't exist!");
          } else {
            var password_hash=rows[0]["password"];
            const verified = bcrypt.compareSync(`${req.body.password}`, password_hash);
            var payload ={
              id : rows[0]["id"],
              name : rows[0]["name"],
              email : rows[0]["email"]
            }
            const token=jwt.sign(payload,process.env.SECRET_KEY)
            if (verified) {
                  return res.status(200).send({
                    msg : "logged in successfully",
                    token
                  })
                } else {
                  res.send("Password is not correct!");
                }
          }
        })
      })

      router.get('/secret-route', async(req, res, next) => {
      try{
        const Token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(Token,process.env.SECRET_KEY,(err,payload)=>{
          res.send(JSON.stringify(payload));
        })

      }catch(e){
          res.status(401).send({error: "please authenticate."})
      }
      });

        module.exports = router;