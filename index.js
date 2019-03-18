// implement your API here
const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/db.js');

server.listen(5000, () => 
    console.log('Server')
);

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    db.users
    .add(userInfo)
    .then(user =>
        res.status(201).json(user)    
    )
    .catch(
        res.status(500).json({message: 'error'})
    )
})

// server.get('/api/users', (req, res) => {
//     db.users
//     .find()
//     .then(
//         res.status(200).json(users)
//     )
//     .catch(
//         res.status(500).json({message: 'error'})
//     )
// })
