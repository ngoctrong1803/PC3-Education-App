const express = require('express');
const router = express.Router();
const Test = require('../app/models/Test')

// getting all
router.get('/', async (req, res) => {
        try {
                const tests = await Test.find();
                res.json(tests);
        }
        catch (err){
                res.status(500).json({
                        message: err.message
                })
        }
})

// getting one
router.get('/:id', getTest,(req, res) => {
        // res.test1 is in getTest
        res.send(res.test1)
})

// creating one
router.post('/', async (req, res) => {
    const test = new Test({
            title: req.body.title,
            description: req.body.description
    })
    try{
        const newTest = await test.save();
        res.status(201).json(newTest);
    }
    catch (err) {
        res.status(400).json({
                message: err.message
        });
    }
})

// updating one
router.patch('/:id', getTest, async (req, res) => {
    if (req.body.title != null){
            res.test1.title/*  res.test1 is in middleware: getTest */ = req.body.title /* client send to server */
    }
    if (req.body.description != null){
        res.test1.description/*  res.test1 is in middleware: getTest */ = req.body.description /* client send to server */
    }
    try {
        const updateTest = await res.test1.save();
        res.json(updateTest)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

// deleting one
router.delete('/:id', getTest, async (req, res) => {
    try{
        await res.test1.remove();
        res.status(200).json({
                message: "deleted test"
        })
    }
    catch (err){
        res.status(500).json({
                message: err.message
        })
    }
})


async function getTest(req, res, next){
        let test
        try{
                test = await Test.findById(req.params.id);
                if (test == null){
                        return res.status(404).json({
                                message: "this test not exist"
                        })
                }
        }
        catch(err) {
                return res.status(500).json({
                        message: err.message,
                        position : "err in getTest Func"
                })
        }
        res.test1 = test
        next();
} 

module.exports = router;