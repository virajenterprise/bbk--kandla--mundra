const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const ExcelJS = require('exceljs');




//Ajax Path Here
const ajax = require('./routes/ajax');


//parser application / json
app.set('views',__dirname+'/views');//render views from this folder
app.set('view engine','ejs');//configure template engine 
app.use(express.urlencoded({extended:false}));
app.use(express.json());//parse form data 
app.use(express.static(path.join(__dirname,'public')));//configure express to use public folder
app.use(fileUpload());//configure express to fileupload
app.use(cookieParser());






//Connection
const conn = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

global.conn=conn;

conn.connect((err)=>{
    if(err)console.log(process.env).DB_HOST;
    console.log('MySql Connected...................');
});

//Calls
app.get('/',ajax.deskPage);
app.get('/createJob',ajax.loadCreatjob);
app.post('/createJob',ajax.Creatjobpost);
app.get('/searchjob',ajax.searchjob);
app.get('/selectjobsearched',ajax.selectjobsearched);
app.post('/addmarkspacking',ajax.addmarkspacking);
app.get('/shipperlistupdate',ajax.updateshipperlist);
app.post('/shippernameadd',ajax.shippernameadd);
app.put('/updateshipper',ajax.updateshipper);
app.put('/editmarkspacking',ajax.editmarkspacking);
app.delete('/deletemarksdetails',ajax.deletemarksdetails);
app.get('/GP',ajax.gp);
app.get('/getvessellist',ajax.getvessellist);
app.get('/getjobdetails',ajax.getjobdetails);
app.get('/getmarkspackingdetails',ajax.getmarkspackingdetails);
app.post('/createnewgatepass',ajax.createnewgatepass);
app.get('/searcholdgatepassbtn',ajax.searcholdgatepassbtn);
app.get('/selectsearcholdgatepassbtn',ajax.selectsearcholdgatepassbtn);
app.post('/updategatepass',ajax.updategatepass);
app.delete('/deletegatepassgrid',ajax.deletegatepassgrid);
app.get('/secondcontainerdetailsjoball',ajax.secondcontainerdetailsjoball);
app.get('/secondcontainerdetailsmarksselected',ajax.secondcontainerdetailsmarksselected);
app.get('/kgp',ajax.kandlaGatepassPrint);
app.get('/PDFgatepass',ajax.PDFgatepass);
//app listen
app.listen(3011,()=>{console.log("Server Started on Port 3011")});