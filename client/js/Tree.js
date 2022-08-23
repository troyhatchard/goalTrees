const config = require('../config/default.json')
const Paper = require('paper')

const { boxHeight, boxWidth, boxSpacing } = config

class TreeNode {
  constructor (name, options) {
    Object.assign(this, {
      name,
      children: [],
      parentId: null
    })
  }
}

// Tree data structure
class Tree {
  constructor () {
    // Key value pairs of an id and a node object. Basically this is used like an array but with unique keys
    // whose values don't change.
    this.nodes = {0: new TreeNode('root')}
    this.lastId = 0
  }

  /**
   *
   * @param {TreeNode} node
   * @param {int} parentId // The id number of the parent
   */
  addNode (node, parentId) {
    let { nodes, lastId } = this
    // Add the node to the nodes object
    const newId = lastId + 1

    // Add the node's id to the list of children in its parent
      node.parentId = parentId

    // Set the last id so the next node can be added on the next call to this function
    this.lastId = newId
  }
}

module.exports.TreeNode = TreeNode
module.exports.Tree = Tree
