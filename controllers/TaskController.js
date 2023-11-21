const taskModel = require('../models/Taskmodel');
const mongoose = require('mongoose')

//Get all object
const getTask = async (req,res) => {
    try{
        const Task = await taskModel.find({})
        return res.status(200).json(Task)
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}

//Get one object by given id
const getEachTask = async (req,res) => {
    const { id } = req.params
    try{
        const Task = await taskModel.findById(id)
        return res.status(200).json(Task)
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}

//Create new object
const createTask = async (req,res) => {
    const { title,description } = req.body

    try{
        const Task = await taskModel.create({ title,description })
        return res.status(200).json(Task)
    }catch(err){
        return res.status(400).json({error : err.message})
    }
}

//Update object by given id
const updateTask = async (req,res) => {
    const { id } = req.params
    const {title,description} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Id is'not valid"})
    }
    try{
        const Task = await taskModel.findByIdAndUpdate(id,{title,description})
        return res.status(200).json(Task)
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}

//Delete task
const deleteTask = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Id is'not valid"})
    }
    try{
        await taskModel.findByIdAndDelete(id)
        return res.status(200).json({message : "Successfully deleted"})
    }catch(err){
        return res.status(400).json({error : err.message})
    }
}

module.exports = { getTask,createTask,getEachTask,updateTask,deleteTask }