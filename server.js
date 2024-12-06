const express = require('express');
require('dotenv').config();  

const app = express();
  app.use(express.json())

require('./dbconfig/dbconfig')
const User = require('./models/User')

app.get('/users', async (req, res) => {
  try {
           let users = await User.find();
           res.status(200).send(users);
  } catch (error) {
    res.status(400).send({err : error});
  }  
  });


app.post('/users', async (req, res) => {
  const {name,age,favoriteFoods} = req.body;
    try {
      const newUser = await User.create({name,age,favoriteFoods});
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

app.put('/users/:id', async (req, res) => {
    try {
      // Utilisation de findByIdAndUpdate pour mettre à jour l'utilisateur
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,  // ID de l'utilisateur à mettre à jour
        req.body,        // Nouvelles données envoyées dans le corps de la requête
        { new: true }     // Retourner l'utilisateur mis à jour après modification
      );
        if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
        res.status(200).json(updatedUser);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
app.listen(3000, ()=>{
  console.log("server started at http://localhost:3000")
})
