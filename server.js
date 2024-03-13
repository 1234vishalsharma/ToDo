const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

let list = []
let listId = 1

app.use(bodyParser.json());

app.get('/' , (req,res)=>{
    res.sendFile(path.join(__dirname , "index.html"));
})


app.get('/todo',(req,res)=>{
    // fetch the list
    res.json(list);
})


app.post('/todo',(req,res)=>{
    const id = listId++;
    const data = {
        title : req.body.title,
        description : req.body.description,
        id: id
    }
    list.push(data);
    res.status(200).send(list);
})


app.put('/todo/:id',(req,res) =>{
    // edit a list
    const id = req.params.id;
    if(id > list.length){
        res.status(400).send("List Not Found");
    }else{
        const data = {
            "title" : req.body.title,        
            "description" : req.body.description,
            "id": id     
        }
        list[id-1] = data;
        res.status(200).send(list);
    }
    
})


app.delete('/todo/:id',(req,res) =>{
    //delete a list
    const id = req.params.id;
        let newList = []
        let idFound = false;
        for(let i=0;i<list.length;i++){
            if(list[i].id != id){
                newList.push(list[i]);
            }
            else{
                idFound = true;
            }
        }
        if(idFound){
            list = newList;
            res.status(200).send(list);
        }else{
            res.status(400).send("List Not Found")
        }
})


app.listen(3000);