var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const con = require("./database.js");
require('dotenv').config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'img')
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});
router
    .get('/admin/product.html', (req,res) => {
        res.render('./product.html');
        })

    .post('/admin/product.html',upload.single("img"), (req,res) => {
      const name = req.body.name;
      const price = req.body.price;
      const color = req.body.color;
      const size = req.body.size;
      const category = req.body.cate;
      const num = req.body.num;
      const material = req.body.material;
      const more = req.body.more;
      const img = `http://44.226.224.61:8000/${req.file.filename}`;
      let proID = 0;
      con.query(`SELECT * FROM product WHERE name = ?`, name , function (err, rows) {
        if (rows[0] === undefined) {
          con.query(`INSERT INTO product (name,price,category,material,more,img) VALUES (?,?,?,?,?,?)`,[name,price,category,material,more,img]);
          con.query(`SELECT p_id FROM product WHERE name = ?`, name, (error,result) => {
            if(error) throw error;
            proID = result[0]["p_id"];
            res.send(result);
            con.query(`INSERT INTO inventory (p_id,color,size,num) VALUES (?,?,?,?)`, [proID,color,size,num]);
          })
          }else{
            con.query(`SELECT p_id FROM product WHERE name = ?`, name, (error,result) => {
              if(error) throw error;
              proID = result[0]["p_id"];
              res.send(result);
              con.query(`INSERT INTO inventory (p_id,color,size,num) VALUES (?,?,?,?)`, [proID,color,size,num]);
          })
        }
        })
 
    })

module.exports = router;