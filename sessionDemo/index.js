const express = require('express');
const app = express();
const session = require('express-session');
const sessionOptions = {
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: false,
}

app.use(session(sessionOptions));

app.get('/viewcount', (req, res)=> {
    if (req.session.count){
        req.session.count += 1; 
    } 
    else{
        req.session.count = 1; 
    }
    res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIMES.`)
});

/**
 * The session is stored in memory. This is not what we would do for production.  It will leak memory under most conditions.  We will want to use ?? redisStore??  or ???mongo???
 */


 // This is used to demo that we can put additional things in our session. 
 app.get('/register', (req,res)=> {
     const {username = 'anonymous' } = req.query;
     req.session.username = username; 
     res.redirect('/greet');
 });

 app.get('/greet', (req,res)=>{
     const { username } = req.session;
     res.send(`Welcome Back, ${username}!`);
 });

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});