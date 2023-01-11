const mongoose = require('mongoose')
const { Schema } = mongoose

const treeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  nodes: {
    type: Object,
    required: true
  },
  lastId: {
    type: Number,
    required: true
  }
})

const Tree = mongoose.model('Tree', treeSchema)
module.exports = Tree
