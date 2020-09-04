const express = require('express');

const Projects = require('./projectModel');

const router = express.Router();

// GET - Get all projects
router.get('/', (req, res) => {
    Projects.get(req.query)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the projects',
            });
        });
});

// GET - Get a project by id
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the project',
        });
      });
});

// POST - Create a new Project
router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error creating the project'
            })
        });
});

// DELETE - Remove a project by id
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'The project has been deleted' });
        } else {
            res.status(404).json({ message: 'The project could not be found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the project',
        });
      });
});

// PUT - Update the project by id
router.put('/:id', validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'The project could not be found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the project',
        });
      });
});

// GET - Get all actions for a project by id
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch (error => {
        console.log(error);
        res.status(500).json({
          message: 'Error getting the actions for the project',
        });
      });
}); 

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            console.log("project", project);
            next();
        } else {
            res.status(400).json({ message: "invalid project id" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    });

    next(); 
}

module.exports = router; 

