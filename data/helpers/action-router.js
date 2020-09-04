const express = require('express');

const Actions = require('./actionModel');

const router = express.Router();

// GET - Get all actions
router.get('/', (req, res) => {
    Actions.get(req.query)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the actions',
            });
        });
});

// GET - Get an action by id
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the action',
        });
      });
});

// POST - Create a new Action
router.post('/', (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error creating the action'
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
router.put('/:id', (req, res) => {
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

module.exports = router; 

