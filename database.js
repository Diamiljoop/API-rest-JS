var express = require('express');
var bodyParser = require('body-parser');

// Création d'une instance de l'application
var app = express();
var port = 8090;

app.use(bodyParser.json());

var tasks = [
  {
    id: 1,
    title: 'première tâche',
    priority: 2,
    createdAt: 'aujourd\'hui',
    finished: false,
  },
  {
    id: 2,
    title: 'deuxième tâche',
    priority: 1,
    createdAt: 'aujourd\'hui',
    finished: true,
  },
];

// Gestion des erreurs 404
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Page non trouvée' });
// });

// Modifier une tâche par ID
app.put('/todos/:id', (req, res) => {
  var taskId = parseInt(req.params.id);
  var index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json({ message: 'Cette tâche a été modifiée avec succès', task: tasks[index] });
  } else {
    res.status(404).json({ error: 'Aucune tâche trouvée' });
  }
});

// Afficher la liste des tâches via l'URI
app.get('/todos',(req,res)=>{
    const index=tasks.map(tasks=>`/task/${tasks.id}`);

    res.json(index);
})
//ajouter une nouvelle tache 
app.post('/todos',(req,res)=>{
    const newtache={
        id: tasks.length +1,
        title: req.body.title,
        priority: req.body.priority,
        createdAt: req.body.createdAt,
        finished: req.body.finished,

    };
    tasks.push(newtache);
    res.status(201).json({message:'tacjes ajoutés avec succees ',tasks:newtache})
})

// Afficher les détails d'une tâche par ID
app.get('/todos/:id', (req, res) => {
  var taskId = parseInt(req.params.id);
  var task = tasks.find((task) => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Aucune tâche trouvée' });
  }
});

// Supprimer une tâche à partir de son ID
app.delete('/todos/:id', (req, res) => {
  var taskId = parseInt(req.params.id);
  var index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: 'Tâche supprimée avec succès' });
  } else {
    res.status(404).json({ error: 'Tâche non trouvée' });
  }
});

// Filtrer les tâches par "search"
app.get('/todos/search', (req, res) => {
  //
});

// Trier les tâches par priorité
app.get('/todos/order', (req, res) => {
  var sortedTasks = [...tasks].sort((x, y) => x.priority - y.priority);
  res.json(sortedTasks);
});

// Démarrer le serveur
app.listen(port,()=>{
    console.log(`serveur demarer par le port ${port}`);
})