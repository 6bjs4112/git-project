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
let db,toMeal_trainer,toMeal_member,toMeal_list,toMeal_comment,toMeal_face;

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

//db저장하기
app.post('/tr/insert',async function(req,res){
    await toMeal_trainer.insertOne(req.body);
    
    const result = await toMeal_trainer.find().toArray();
    res.send(result)
})
app.post('/mb/insert',async function(req,res){
    await toMeal_member.insertOne(req.body);
    
    const result = await toMeal_member.find().toArray();
    res.send(result)
})

//아이디 중복확인
app.post('/tr/idCheck',async function(req,res){
    const needCheckid = req.body.id;
    
    const query = {tr_id:needCheckid};
    const result = await toMeal_trainer.countDocuments(query);
    console.log(result);
    if(result==0){
        return res.send(true);
    }else{
        return res.send(false);
    }
})
app.post('/mb/idCheck',async function(req,res){
    const needCheckid = req.body.id;

    const query = {mb_id:needCheckid};
    const result = await toMeal_member.countDocuments(query);
    console.log(result);

    if(result==0){
        return res.send(true);
    }else{
        return res.send(false);
    }
})
//트레이너 코드 확인 후 해당 트레이너에 회원 저장
app.post('/mb/codeCheck',async function(req,res){
    const needCheckCode = req.body.code;
    const needAddId = req.body.mb_id;

    const result = await toMeal_trainer.countDocuments({tr_code:needCheckCode});
    console.log(result);

    if(result==0){
        return res.send(false);
    }else{
        await toMeal_trainer.updateOne(
            { "tr_code": needCheckCode },
            { $push:{"tr_family": needAddId }}
        );
    }
})

app.listen(3000,dbConnect)