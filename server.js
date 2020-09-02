const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'rosechen',
    password : '',
    database : 'facereco'
  }
});

app.use(express.json()); // 必要！解析request body裡的json資料
app.use(cors()); //允許所有跨來源資源共用(CORS)


app.get("/", (req, res) => { res.send('It is working!') })

// signin，查詢使用者輸入的信箱和密碼是否符合login資料庫
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

// register，同步「新增」使用者到login和users資料庫，並回傳新增的使用者資料給前端
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });

// profile，若id符合users資料庫id，「取得」某id的使用者資料給前端
app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db) });

// image，「更新」users資料庫中使用者submit pictures的次數
app.put("/image", (req, res) => { image.handleImage(req, res, db) });

// imageur;，呼叫clarifai api
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res)});

app.listen( process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${ process.env.PORT}`);
});



/* endpoints
/                --> res = this is working
/signin          --> POST = success/fail
/register        --> POST = user
/profile/:uderId --> GET = user
/image           --> PUT --> user

*/




