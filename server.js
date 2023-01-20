const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./model/user');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = 'annelikesappleandtravellinginanaeroplane.'

mongoose
.connect("mongodb+srv://blog:manndami@cluster0.mi9powe.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("database is working")
})

app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())


app.post('/api/change-password', async (req, res) => {
    const { token, newPassword:plainTextPassword } = req.body;

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'invalid password'})
    }
    if(plainTextPassword.length < 7 ){
        return res.json({status:'error', error:'password is too small, should contain atleast 8 characters' })
    }

    try{
        const user = jwt.verify(token, JWT_SECRET);
        const password = bcrypt.hash(plainTextPassword, 10)
        const _id = user.id

        await User.updateOne(
            {_id},
            {
                $set: { password }
            }
            )
            res.json({status:'ok', })

    }catch(error){
        res.json({status:'error', error:'invalid information'})
    }
  
})


app.post('/api/login', async (req, res) => {
const { fullname, password} = req.body;
const user = await User.findone({ fullname }).lean()

if(!user){
    return res.json({status: 'error', error: 'invalid Name or password!'})
}

if(await bcrypt.compare(password, user.password)) {

const token = jwt.sign({id: user._id,
             fullname: user.fullname
    },
     JWT_SECRET  
     )

return res.json({status: 'ok', data: token})
}

res.json({status:'error', error:'invalid Name or password'})
})


app.post('/api/register', async (req, res) => {

const { fullname, password: plainTextPassword} = req.body

if(!fullname || typeof fullname !== 'string') {
    return res.json({status: 'error', error: 'invalid Name'})
}

try{
    const response = await User.create({
        fullname,
        password
    })
console.log("user created successfully", response)
}
catch(error){
    if(error === 11000){
    return res.json({staus:'error', error:'username already in use'})
}
}

res.json({ status:'ok' })
})

app.listen(4000, ()=>{
    console.log('server is running successfully')
})