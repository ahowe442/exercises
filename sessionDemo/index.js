const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({secret: 'thisisnotagoodsecret'}));

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

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});