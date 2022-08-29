//npm - Libary used 
const express=require('express');
const mysql=require('mysql');
const path=require('path');
const bodyparser=require('body-parser');
const app=express();

//creating database connection
const db=mysql.createConnection({
    host:'localhost',
    user:'kennedy',
    password:'Kendb123*',
    database:'mydb',
});

/*
//connecting to database
db.connect((err)=>{
    if(err){
        throw err;
    }
    else
        console.log('connected');
    
        //creating database
        //let sql='CREATE DATABASE mydb';
        /*db.query(sql,(err,result)=>{
            if (err) {
                throw err;
            } else {
                console.log(result);
            }
        });

        //creating table
        let sql='CREATE TABLE clients(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Firstname VARCHAR(255), Lastname VARCHAR(255), Email VARCHAR(255) UNIQUE, Password VARCHAR(255) UNIQUE)';
        db.query(sql,(err,result)=>{
            if (err) {
                throw err;
            } else {
                console.log(result);
            }
        })
});

*/

app.use(bodyparser.urlencoded({extended:false}));
app.use('/public',express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));

//display login page
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'public', 'login.html'));
});

app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'public', 'register.html'));
});

//registeration - inserting data into our database
app.post('/register',(req,res)=>{
    var firstname = req.body.firstname;
    var lastname=req.body.lastname;
    var email=req.body.email;
    var password = req.body.password;

    const sql=(`INSERT INTO clients (Firstname,Lastname,Email,Password) VALUES ("${firstname}","${lastname}","${email}","${password}")`);
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            console.log('successfully added');
            //res.send('successfully registered');
            res.redirect('/login');
        }
    })
});

//login - 
app.post('/login',(req,res)=>{
    var email=req.body.email;
    var password = req.body.password;

    const sql=(`SELECT * FROM clients WHERE Email = "${email}" AND Password = "${password}"`);
    db.query(sql,(err,result)=>{
        if (err) {
            res.send('make sure your email and password is correct');
            res.redirect('/login');
        } else {
            res.send('welcome Back');
        }
    })
})

//creating listening port
app.listen(3300,(err)=>{
    if(err){
        throw err;
    }
    else
        console.log('Server is Running....');
});
