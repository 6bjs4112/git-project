//server -> index.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Connection URL
const url = 'mongodb+srv://Yoonha:bPFob5CzQpxLi5Pr@cluster0.zyx3gv4.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
let db;

const dbConnect = async function(){
    await client.connect();
    console.log('db접속성공');
    db = client.db('today-s_meal');

    toMeal_trainer= db.collection('toMeal_trainer');
    toMeal_member= db.collection('toMeal_member');
    toMeal_list= db.collection('toMeal_list');
    toMeal_comment= db.collection('toMeal_comment');
    toMeal_face= db.collection('toMeal_face');
    
    return '끝';
}

app.get('/tr',async function(req,res){
    const result = await toMeal_trainer.find().toArray();
    res.send(result)
})
app.get('/mb',async function(req,res){
    const result = await toMeal_member.find().toArray();
    res.send(result)
})
app.get('/list',async function(req,res){
    const result = await toMeal_list.find().toArray();
    res.send(result)
})
app.get('/com',async function(req,res){
    const result = await toMeal_comment.find().toArray();
    res.send(result)
})
app.get('/face',async function(req,res){
    const result = await toMeal_face.find().toArray();
    res.send(result)
})

//저장하기
app.post('/mb/insert',async function(req,res){
    await toMeal_member.insertOne(req.body);
    
    const result = await toMeal_member.find().toArray();
    res.send(result)
})

app.listen(3000,dbConnect)