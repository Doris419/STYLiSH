const express = require("express");
const app = express();
const cors = require("cors")
var route = require('./ProductList.js');
var fileUploadRouter = require('./fileUpload.js');
var signRouter = require('./sign.js');
var payRouter = require('./pay.js');

route.use(express.json);
app.use(cors());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static('img'));
app.use("/api/v1", route);
app.use("/",fileUploadRouter);
app.use("/",signRouter);
app.use("/",payRouter);

app.listen(8000, () => {
    console.log("server started on port 8000");
});

module.exports = app;