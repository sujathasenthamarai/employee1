const express=require("express");
const app=express();
const mongoose=require('mongoose');
const port=3000;
const bodyparser=require("body-parser");
const path=require("path");
const htmlfile=require("./home")


app.use(express.static(path.join(__dirname,'..','employee-data')));

app.use(bodyparser.json());

var urlencodedparser=bodyparser.urlencoded({extended: true})

const url=`mongodb+srv://sujathasenthamarai:suji$17yazh@cluster0.oquejho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url)
    .then((x)=>{console.log(`Connected Successfully! ${x.connections[0].name} `)})
    .catch((err)=>{console.error(`connection Problem: ${err}`)});

const empdata=mongoose.Schema(
    {
        id:String,
        name:String,
        age:Number,
        designation: String,
        mobile:Number
    });

const empdetails=mongoose.model('EmployeeDetails',empdata);


app.get('/',(req,res)=>{
    res.send(htmlfile({}));
    
});

app.get('/data',(req,res)=>{
    empdetails.find().then((data)=>{      
        res.json(data)});
    
});


    
        
    


const hostname="http://localhost:3000/";
app.post("/",urlencodedparser,(req,res)=>{
   
    if(req.body.hidden==1){
        empdetails.collection.insertOne({id:req.body.id,name: req.body.name,age:req.body.age,designation:req.body.desg,mobile:req.body.mobile })
        .then(()=>{console.log('inserted successsfully');res.send(`<script>alert('DATA ADDED SUCCESS');javascript:history.back();</script>`)})
        .catch((err)=>{console.error(`connection Problem: ${err}`)});
    }else if(req.body.hidden==2){
        empdetails.collection.deleteOne({id:req.body.did})
        .then(()=>{  res.send(`<script>alert('Deleted');javascript:history.back();</script>`)      })
        .catch((err)=>{console.error(`connection Problem: ${err}`)});
    }else if(req.body.hidden==3){
        empdetails.updateOne({id:req.body.id},{id:req.body.idu,name: req.body.nameu,age:req.body.ageu,designation:req.body.desgu,mobile:req.body.mobileu })
        .then(()=>{  res.send(`<script>alert('Updated');javascript:history.back();</script>`)      })
        .catch((err)=>{console.error(`connection Problem: ${err}`)});
    }
  
});
   


app.listen(port,()=>{console.log(`listening Port localhost:${port}`)});
    
