const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @decs   Get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user:req.user.id})

    res.status(200).json(goals)
})

// @decs   Set goals
// @route  POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user : req.user.id,
    })

    res.status(200).json(goal)
})

// @decs   Update goals
// @route  PUT /api/goals
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error ('User not found')
    }

    //make sure the loggin user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updatedGoal)
})

// @decs   Delete goals
// @route  DELETE /api/goals
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error ('User not found')
    }

    //make sure the loggin user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const deletedGoal = await Goal.findByIdAndRemove(req.params.id)

    res.status(200).json(deletedGoal)
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}