const express = require('express')
const router = express.Router()
const { createTask,getTask,getEachTask,updateTask, deleteTask } = require('../controllers/TaskController')


//CREATE
router.post('/',createTask)
//GET
router.get('/',getTask)
//GET - ONE
router.get('/:id',getEachTask)
//UPDATE
router.put('/:id',updateTask)
//DELETE
router.delete('/:id',deleteTask)

module.exports = router;