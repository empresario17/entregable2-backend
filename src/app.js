const express = require('express');
const db = require("./utils/database");
const Todos = require('./models/todos.model');
const { cast } = require('sequelize');

db.authenticate()
.then(() => console.log("Base de datos conectada"))
.catch((err) => console.log(err));

db.sync()
.then(() => console.log("Base de datos sincronizada"))
.catch((error) => console.log(error))

const app = express(); 
 
app.use(express.json());

app.get("/", (req, res) => { 
    res.send('Servidor funcionando');
});

app.post('/todos', async (req, res)=> {
    try{ 
      const newTodos = req.body;
      await Todos.create(newTodos); //insertando datos
      res.status(201).send();
    } catch (error) {
        res.status(400).json(error); 
        
    }
});

//Todas las Tareas
app.get('/api/v1/todos', async (req, res) =>{
    try {
        const todos = await Todos.findAll()
        res.json(todos); 
    } catch (error) {
        res.status(400).json(error);    
    }
    });

// Tarea por ID en la ruta
app.get("/api/v1/todos/:id", async (req, res) =>{
    try {
//para recuperar el parametro de ruta
// req.params ? es un objeto que tiene todos los parametros de la ruta
const { id } = req.params;
 console.log(req.params);

 const todo = await Todos.findByPk(id);
 res.json(todo);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Eliminar una tarea
app.delete('/api/v1/todos/:id', async (req, res) =>{
    try {
        const {id} =req.params;
        await Todos.destroy({
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

//actualizar una tarea
app.put('/api/v1/todos/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const { title, description } = req.body;
        await Todos.update({title, description}, {
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});


app.listen(8000, () => {
console.log("Servidor escuchando en el puerto 8000")
});