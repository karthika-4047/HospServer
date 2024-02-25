
//importing
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

//initialisation
const app = new express();
const filepath = path.join(__dirname,"Hospdata.json");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//get method
app.get('/hospital',(req,res)=>{
    
    fs.readFile(filepath,(err,data)=>{
        if(err){ console.log("Error occured"+ err)}
        else{
            var parsedData = JSON.parse(data);
            console.log(parsedData)
            res.end(JSON.stringify(parsedData));
        }
    }); 
})


//post method
app.post('/api',(req,res) =>{
    fs.readFile(filepath,(err,data)=>{
        if(err){ console.log("Error occured"+ err)}
        else{
            const newData = {
                id : req.body.id,
                hospital : req.body.hospital,
                patients : req.body.patients,
                location : req.body.location
            }
            var parsedData = JSON.parse(data);
            console.log(parsedData)
            parsedData.push(newData);

            fs.writeFile(filepath, JSON.stringify(parsedData), (err) => {
                if (err) {
                    console.log("Error occurred: " + err);
                    // res.status(500).send("Error writing file");
                    // return;
                }
                res.json(parsedData);         
        });
    };
});
});


app.put('/edit',(req,res) =>{
    fs.readFile(filepath,(err,data)=>{
        if(err){ console.log("Error occured"+ err)}
        else{
            var parsedData = JSON.parse(data);
            console.log(parsedData)
            parsedData.splice(0,1,req.body);
            fs.writeFile(filepath, JSON.stringify(parsedData), (err) => {
                if (err) {
                    console.log("Error occurred: " + err);
                    res.status(500).send("Error writing file");
                    return;
                }
                res.send({message:"Data updated",parsedData});
                // res.json(parsedData);         
        });
    };
});
});


//delete method
app.delete('/remove',(req,res) =>{
    fs.readFile(filepath,(err,data)=>{
        if(err){ console.log("Error occured"+ err)}
        else{
            var parsedData = JSON.parse(data);
            parsedData.pop();
            fs.writeFile(filepath, JSON.stringify(parsedData), (err) => {
                if (err) {
                    console.log("Error occurred: " + err);
                    res.status(500).send("Error writing file");
                    return;
                }
                res.send({message:"Data removed",parsedData});     
        });
    };
});
});


//app listening
app.listen(3000, (req,res)=>{
    console.log('Server is running on port 3000');
});


