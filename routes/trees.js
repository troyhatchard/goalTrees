const express = require('express')
const router = express.Router()

const Tree = require('../models/Tree')

router.get('/', function(req, res) {
  res.send('trees api root')
})

router.get('/all', async (req, res) => {
  try {
    const trees = Tree.find()
    res.send(trees)
  } catch (err) { throw err }
})

router.get('/find/:name', async (req, res) => {
  try {
    const { params } = req
    const { name } = params

    const results = await Tree.findOne({ name })

    res.send(results)
  } catch (err) { throw err }
})

router.put('/save', async (req, res) => {
  try {
    const { treeData } = req.body
    const { name, nodes, lastId } = treeData

    // const existingTree = await Tree.findOne({ name })

    // if (existingTree) {
    //   existingTree.updateOne()
    // }
    // const tree = new Tree(treeData)
    // const result = await tree.save()

    const result = await Tree.updateOne({ name }, { nodes, lastId }, { upsert: true })

    res.send(result)
  } catch (err) { throw err }
})

module.exports = router
