const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const approute = require('../backend/route');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app =express();
const bodyParser = require('body-parser');
var MongoDBStore = require('connect-mongodb-session')(session);

const { Pdf} = require("./schema");
dotenv.config();
const SESSION_KEY = process.env.SESSION_KEY;
const mongoUrl = process.env.DBURI;


app.use(bodyParser.json({ limit: '100mb' }));

app.use(express.json({ limit: '100mb' }));

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());

app.use(express.static(path.join(__dirname, './build')));

app.get('/', cors(), (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

let corspolicy = {
    origin : "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
app.use(cors(corspolicy));
var store = new MongoDBStore({
    uri: mongoUrl,
    collection :'mySessions',
})
app.set("trust proxy",1);
app.use(cookieParser(SESSION_KEY));
app.use(
    session({
        secret: SESSION_KEY,
        resave:false,
        store :store,
        saveUninitialized : false,
        cookie:{
            sameSite:"strict",
            httpOnly:true,
            maxAge:6*60*60*1000,
            rolling: true,
        }
    })
)
app.use('/en', approute);
app.get('/checksessionexpiry', async(req,res)=>{
    a= req.session.loggedInemail;
    if(a!==undefined){
        res.json(1);
    }
    else{
        res.json(req.session);
    }

})
mongoose.connect(mongoUrl).then(()=>{
    console.log('Connected to the database')
})
.catch((e) => console.log(e));

// app.get('*', function(req,res){
//     res.sendFile(path.resolve(__dirname,'./build', 'index.html'));
// })

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
