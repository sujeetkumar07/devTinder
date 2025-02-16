const express = require('express');
const app = express();


app.use("/hello",(req,res)=>{
    res.send("hello")
})
app.use("/test",(req,res)=>{
    res.send("Hello send from the server that is running at 3000")
})
app.listen(3000,()=>{
    console.log('server is successfully running at 3000');
});