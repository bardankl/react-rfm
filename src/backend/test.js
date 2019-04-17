const express = require('express');

const app = express();

app.get('/2', (req, res)=>{
let a = req.body;
    res.send('<h1>hello</h1>')
});

app.listen(3000);

https://github.com/bardankl/react-rfm
