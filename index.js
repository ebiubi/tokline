const express = require('express')
const knex = require('./knexHelp')
const app=express()
const port=4000
const bodyParser = require('body-parser')

app.use(express.json())

app.get('/',(req,res) => {
    res.send({
        version: '0.0.1',
        author: 'rubirubi'
    })
})

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
        password: req.body.password,
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



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})