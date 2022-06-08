const express = require('express');
const Sequelize = require('sequelize')
const mysql = require('mysql');
const sqlite = require('sqlite3').verbose();
const database = require('./config/database');
const moment = require('moment');
const uuid = require('uuid');
const app = express();
const bodyParser = require('body-parser')

// Connecting Database
let db = new sqlite.Database("./database.db" ,sqlite.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)
    console.log("DataBase Connected");
})

sql = "CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, school TEXT NOT NULL, dob TEXT NOT NULL);"

db.run(sql)

// async function getEmails(db, id) {
//     return new Promise((resolve, reject) => {
//         db.get(`SELECT email FROM '${id}'`,(err, row) => {
//             if (err) reject(err);
//             resolve(row.channel);
//         });
//     });

// }

students = [
    {"ID": 1001, "fname": "Stuart", "lname": "Allen", "email": "s@gmail.com", "school": "Business", "DOB": "2001-01-04"},
    {"ID": 1002, "fname": "Gregory", "lname": "Thomas", "email": "g@gmail.com", "school": "Engineering", "DOB": "1993-10-09"},
    {"ID": 1003, "fname": "Steve", "lname": "Barnes", "email": "b@gmail.com", "school": "Education", "DOB": "1995-06-09"},
    {"ID": 1004, "fname": "Jack", "lname": "Cooper", "email": "j@gmail.com", "school": "Business", "DOB": "1991-08-09"},
    {"ID": 1005, "fname": "Osborn", "lname": "Davis", "email": "o@gmail.com", "school": "Business", "DOB": "1997-02-09"}
]

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render("index", {data: students});
});

app.get('/view', function(req, res) {
    res.render("viewStudents", {data: students, errors: false});
});

app.post('/edit/:id', function(req, res) {
    console.log(req.params.id)
    theID = req.params.id
    let student
    for (i=0; i<students.length; i++){
        if (students[i].ID == theID){
            student = students[i]
        }
    }
    res.render("editNow", {data: theID, student: student});
});

app.post('/process_edits/:id', function(req, res) {
    theID = req.params.id
    let student
    for (i=0; i<students.length; i++){
        if (students[i].ID == theID){
            student = students[i]
        }
    }
    student.fname = req.body.fname
    student.lname = req.body.lname
    student.dob = req.body.dob
    student.email = req.body.email
    student.school = req.body.school

    res.redirect("/view");
});

app.post('/delete/:id', function(req, res) {
    theID = req.params.id
    for (i=0; i<students.length; i++){
        if (students[i].ID == theID){
            students.splice(i, 1);
        }
    }
    res.redirect("/view")
});

app.post('/create', function(req, res) {
    const data = req.body;

    myIDs = []
    for (i=0; i<students.length; i++){
        myIDs.push(students[i].ID)
    }

    let thisID = Math.floor(Math.random() * 100) + 998;

    thisID = Math.floor(Math.random() * 100) + 998;


    const thisEntry = {"ID": thisID, "fname": data.fname, "lname": data.lname, "email": data.email, "school": data.school, "DOB": data.dob}
    students.push(thisEntry)
    res.redirect("/view")
});






const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server Started on Port ${PORT}`));

