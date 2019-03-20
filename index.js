// implement your API here
const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/db.js');

server.listen(5000, () => 
    console.log('Server is running')
);

server.get('/api/users', (req, res) => {
    db.users
    .find()
    .then(user => {res.status(200).json(user)})
    .catch(error => {
        res.status(500).json({ message: 'error reading user' });
      });
})
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
if (req.body.id !== id){
    res.status(400).send('This user can not be found')
}else{
    db.users
    .findById(id)
    .then(user => {res.status(200).json(user)})
    .catch(error => {
        res.status(500).json({ message: 'error reading user' });
      });
    }
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('user information', userInfo);
    if(req.body.name === "" || req.body.bio === ""){
        res.status(400).send('Require Name/Bio')
    }else{
    db.users
    .insert(userInfo)
    .then(user =>
        res.status(201).json(user)    
    )
    .catch(error => {
        res.status(500).json({ message: 'error creating user' });
    });
}
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.users
    .remove(id)
    .then(deleted => {
        res.status(204).end();
    })
    .catch(error => {
        res.status(500).json({ message: 'error deleting user' });
    });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const change = req.body;
    console.log(id);
    db.users
    .update(id, change)
    .then(updated => {
    if (updated) {
        res.status(200).json(updated);
        } else {
        res.status(404).json({ message: 'user not found' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'error updating user' });
    });
})

