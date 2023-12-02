const express=require('express')
const app=express()
const boduparse=require("body-parser")
const cors=require('cors')
const mysql=require('mysql2')

app.use(cors())
app.use(express.json())
app.use(boduparse.urlencoded({extended:true}))
const bcrypt = require('bcrypt'); 
var jwt = require('jsonwebtoken')

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"crud_app"
})

app.get("/",(req,res)=>{
    // const sqlInsert="INSERT INTO crud_table(name) VALUES ('naveen')";
    // db.query(sqlInsert,(err,res)=>{ 
    //     console.log("error",err);
    //     console.log(res);
    // })
    res.send("home page")
})

app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT * FROM crud_table"
    db.query(sqlGet,(err,response)=>{
        res.send(response)
    })
})

app.post("/api/getuser",(req,res)=>{
    const sqlGetUser="SELECT * FROM users WHERE email=?"
     db.query(sqlGetUser,[req.body.userEmail],(err,response)=>{
        res.send(response)
    })
})

app.post("/api/post",(req,res)=>{
    const {todoInput,userEmail}=req.body
    const sqlPost="INSERT INTO crud_table(name,isCompleted,email) VALUES (?,?,?)";
    db.query(sqlPost,[todoInput,false,userEmail],(err,response)=>{
        res.send("New ToDO Upadted!")
    })

})

app.delete("/api/delete/:id",(req,res)=>{
    const {id}=req.params
    const sqlDelete="DELETE FROM crud_table WHERE id=?"
    db.query(sqlDelete,[id],(err,response)=>{
        res.send("Deleted From ToDo.")
    })
})

app.post("/api/update",(req,res)=>{
    const {status,id}=req.body
    const sqlUpdate=`UPDATE crud_table SET isCompleted=? WHERE id=?`
    db.query(sqlUpdate,[status,id],(err,response)=>{
        res.send("Updated Todo..")
    })

})

app.post('/api/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ?";
    const {email}=req.body
    db.query(sql, [email], (err, result) => {
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
                    return res.json({Status: "Success", Token: token,Email:email})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
            })
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.post('/api/register', (req, res) => {
    const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
    const sqlchecklogin = "SELECT * FROM users WHERE email = ?";

    bcrypt.hash(req.body.password.toString(), 5, (err, hash) => {
        if (err) {
            return res.json({ Error: "Error in hashing password" });
        }

        db.query(sqlchecklogin, [req.body.email], (err, response) => {
            if (err) {
                return res.json({ Error: "Error in database query" });
            }

            if (response.length > 0) {
                return res.json({ Status: "Email Already Exists!" });
            }

            const values = [
                req.body.name,
                req.body.email,
                hash,
            ];

            db.query(sql, [values], (err, result) => {
                if (err) {
                    return res.json({ Error: "Error in database query" });
                }
                
                return res.json({ Status: "Success" });
            });
        });
    });
});


app.listen(5000,()=>console.log("listening"))