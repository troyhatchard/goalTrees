const config = require('../config/default.json')
const Paper = require('paper')

const { boxHeight, boxWidth, boxSpacing } = config

class TreeNode {
  /**
   *
   * @param {string} name
   * @param {object} options
   * @param {array<int>} options.children
   * @param {int} options.parentId
   */
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

  /**
   *
   * @param {object} nodes optional nodes object
   */
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
    nodes[newId] = node

    // Add the node's id to the list of children in its parent
      nodes[parentId].children.push(newId)
      node.parentId = parentId

    // Set the last id so the next node can be added on the next call to this function
    this.lastId = newId
  }
}

module.exports.TreeNode = TreeNode
module.exports.Tree = Tree
