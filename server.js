'use strict'
require('dotenv').config();
const express=require('express');
const PORT=process.env.PORT||3030;
const app=express();
const superagent=require('superagent');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//to use the ejs
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index');
   // res.status(200).send('okkkk');
})

app.get('/list',(req,res)=>{
    let family=['Dima','Lina','Majed','Sara'];
    res.render('listFamily',{data:family});
})

app.get('/books',(req,res)=>{
    //get books from google book api
    //.then
    //send the result 
    let url =` https://www.googleapis.com/books/v1/volumes?q=cats`;
    superagent.get(url)
    .then(data =>{
        //res.json(data.body)
        res.render('booksPage',{book:data.body.items})
    })
})
app.get('*',(req,res)=>{
res.status(404).send('this route does not exist');
})

app.listen(PORT,()=>{
    console.log(`listining to my PORT ${PORT}`)
})

