require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const flash = require('')
const PORT = process.env.PORT || 8001

const app = express()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.Connect_DB,{useUnifiedTopology:true,useNewUrlParser:true})
    .then(res=>{
        if (res) {
            console.log('db connected');
            app.listen(process.env.PORT, ()=> {
                console.log(`server running at http://localhost ${PORT}`);
            })
        } else {
            console.log('db not connected');
        }
})
.catch((err) => {
    console.log(err);
});

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.render('form',{error:false});
});

app.post('/post', (req, res) => {
    return res.render('form',{error:'username or email does not exist'});
});
