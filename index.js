const express = require('express')
const knex = require('./knexHelp')
const app=express()
const port=4000
const cors = require('cors')
const {hashPassword,comparePassword,generateJwt,verifyJwt} = require('./config/utils')
const authMiddleware = require('./middleware/auth')
const bodyParser = require('body-parser')
const { compare } = require('bcrypt')

app.use(cors({
    origin: 'http:localhost:3000',
    credentials: false
}))
app.use(express.json())



app.get('/',(req,res) => {
    res.send({
        version: '0.0.1',
        author: 'rubirubi'
    })
})


// REGION AUTH
app.post('/register', (req,res) => {
    return knex.table('users').insert({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        phone: req.body.phone
    }).then(() => {
        res.send({
            message: 'registration is completed',
            data: []
        })
    }).catch((error) => {
        res.status(500).json({
            message: 'email already register'
        })
    })
})

app.post('/login', (req,res) => {
    return knex.select()
        .where('email', req.body.email)
        .table('users').then(data=> {
            console.log(req.body.password, data[0].password)
            const hasil = comparePassword(req.body.password, data[0].password)
            if(hasil) {
                res.send({
                    accessToken: generateJwt({id:data[0].id, name:data[0].name})
                })
            }else{
                res.send({
                    message: 'Failed'
                })
            }
        })
})

// app.use(authMiddleware)

app.get('/products', (req,res) => {
    knex.select().table('products').then(data=>{
        res.send({
            message: 'get all data',
            data,
        })
    })
})

app.post('/products', (req,res) =>{
    return knex.table('products').insert({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    }).then(data=>{
        return res.send({
            message: 'add record data success',
            data: []
        })
    })
})


app.put('/products/:id', (req,res) => {
    return knex.table('products').where('id', req.params.id).update({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    }).then(data => {
        return res.send({
            message: 'update data success',
            data: []
        })
    })
})

app.delete('/products/:id', (req,res) => {
    return knex.table('products').where('id', req.params.id).del().then(data=>{
        return res.send({
            message: 'Delete data success',
            data: []
        })
    })
})


// USER PART
app.get('/users', (req,res) => {
    return knex.select().table('users').then(data => {
        res.send({
            data,
            message: 'get all data success'
        })
    })
})

app.post('/users', (req,res) => {
    return knex.table('users').insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }).then(data=> {
        res.status(200).json({
            message: 'Add record data success',
            data: [data]
        })
    })
})

app.patch('/users/:id', (req,res) => {
    return knex.table('users').where('id', req.params.id).update({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        phone: req.body.phone
    }).then(data => {
        res.status(200).json({
            message: 'Updata data success',
            data: [data]
        })
    })
})

app.delete('/users/:id', (req,res) => {
    return knex.table('users').where('id', req.params.id).del().then(() => {
        res.send({
            data: [],
            message: 'delete data success'
        })
    })
})



// CATEGORIES 
app.get('/categories', (req,res) => {
    return knex.select().table('categories').then(data=>{
        res.send({
            message: 'Get data success',
            payload: {
                data: data,
                pagination: {
                    prev: '',
                    next: '',
                    limit: ''
                }
            }
        })
    }).catch(err=>{
        console.log("err", err)
        res.status(5001).json({
            message: 'error fetch',
        })
    })
})

app.get('/categories/:id', (req,res) => {
    return knex.select().where('id', req.params.id).table('categories').then(data => {
        res.send(data)
    }).catch(err => {
        console.log("err",err)
        res.status(5001).json({
            message:'error fetch'
        })
    })
})

app.post('/categories', (req,res) => {
    return knex.table('categories').insert({
        name: req.body.name
    }).then(data=>{
        res.status(200).json({
            message: 'Insert data success'
        })
    }).catch(err=>{
        console.log(err)
        res.status(5001).json({message: 'error create data'})
    })
})


app.patch('/categories/:id', (req,res) => {
    return knex.table('categories').where('id', req.params.id).update({
        name: req.body.name
    }).then(data=>{
        res.json({
            statusCode: 200,
            message: 'Updata data success'
        })
    }).catch(err=> {
        res.json({
            statusCode: '500',
            message: 'Error updated data'
        })
    })
})

app.delete('/categories/:id', (req,res) => {
    return knex.table('categories').where('id', req.params.id).del().then(() => {
        res.json({
            statusCode: 200,
            message:'Delete data success'
        })
    }).catch(err=>{
        res.json({
            statusCode: 500,
            message: 'Error delete data'
        })
    })
})


// COUPON
app.get('/coupon', (req,res) => {
    return knex.select().table('coupon').then(data=>{
        res.status(200).json({
            message: 'Get coupon success',
            data: data
        })
    }).catch(err=>{
        res.json({
            statusCode: 500,
            message: 'Get coupon failed'
        })
    })
})

app.get('/coupon/:id', (req,res) => {
    return knex.table('coupon').where('id', req.params.id).then(data => {
        res.status(200).json({
            statusCode: 200,
            message: 'Get coupon',
            data:data[0]
        })
    }).catch(err => {
        res.json({
            statusCode: 500,
            message: 'Get failed'
        })
    })
})

app.post('/coupon', (req,res) => {
    return knex.table('coupon').insert({
        code: req.body.code,
        description: req.body.description
    }).then(data=>{
        res.status(200).json({
            statusCode: 200,
            message: 'Add coupon success',
            data: data
        })
    }).catch(err=>{
        res.status(500).json({
            statusCode: 500,
            message: 'Error insert data'
        })
    })
})

app.patch('/coupon/:id', (req,res) => {
    return knex.table('coupon').where('id', req.params.id).update({
        code: req.body.code,
        description: req.body.description
    }).then(data=>{
        res.status(200).json({
            statusCode: 200,
            message: 'Update data success',
            data: data
        })
    })
})

app.delete('/coupon/:id', (req,res) => {
    return knex.table('coupon').where('id', req.params.id).del().then(data=>{
        res.status(200).json({
            statusCode:200,
            message: 'Delete coupon',
            data:data
        })
    }).catch(err=>{
        res.status(500).json({
            statusCode: 500,
            message: 'Delete failed',
            serverMessage: err,
            data: data
        })
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})