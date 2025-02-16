const express = require('express');
const app = express();


app.use("user",(req,res)=>{
    res.send("Heyyyyyyyyyyy")
})
//This will only handle GET call to users
app.get("/user",(req,res)=>{
    res.send({firstName: "Sujeet", lastName:"Kumar"})
});
app.post("/user",(req,res)=>{
    // console.log("save data to the database");
    res.send("saving the data to database");
});
app.delete("/user",(req,res)=>{
    res.send("deleted successfully");
});
//this will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("hello")
})
app.listen(7777,()=>{
    console.log('server is successfully running at 3000');
});