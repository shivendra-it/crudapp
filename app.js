const express = require('express')
const app = express()
const BP = require('body-parser')
const mongoClient = require('mongodb').MongoClient


mongoServerUrl = 'mongodb://localhost:27017/death'
port = 7070

siteURL = 'http://localhost:' + port
var db

app.set("views",__dirname+'/views/')
app.set('view engine', 'pug')

app.use(BP.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Death Note")
})

 app.get('/index',(req,res)=>{
     var collection = db.collection('note')
     collection.find({}).toArray(function(err,docs){
         res.render('index',{url: siteURL, title: 'No   dejs Crud Application', message: 'Welcome to NodeJs CRUD Application',name:'Your name',death_note:'Your note',users:docs})
     })
 })

 app.get('/add',(req,res)=>{
     var collection = db.collection('note')
     res.render('add',{url:siteURL,title:'Add notes'})
 })


 app.post('/add',(req,res)=>{
     console.log(res.body)
     var collection = db.collection('note')
     collection.insert(req.body,(err,result)=>{
         if (err) return err
         console.log("successfully entered the data")
         
     })
     res.redirect('/index')
 })


 app.get('/edit',(req,res)=>{
     console.log('edit the document dude')
     var collection = db.collection('note')
     collection.find({name:req.query.name}).toArray(function(err,r){
         res.render("edit",{title:'updating note'+req.query.name,users:r[0]})
     })
 })

 app.post('/edit',(req,res)=>{
     var collection =db.collection('note')
     collection.update({name:req.body.name},{
         $set:{
             name:req.body.name,
             death_note:req.body.death_note
         },
     }, { w : 0 } ,function(err,result){
         if (err) return err
         console.log('record updated successfully')
     })
     res.redirect('/index')
 })



 app.use('*',function(req,res){
     res.render('404',{url:siteURL})
 })

 mongoClient.connect(mongoServerUrl,function(err,database){
     db = database
     if (err) return err
     console.log('Db connected')


     app.listen(process.env.PORT || port , ()=>{
         console.log("server running")
     })

 })