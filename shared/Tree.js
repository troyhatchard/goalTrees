const TreeNode = require('./TreeNode')

// Tree data structure
class Tree {
  /**
   *
   * @param {object} nodes optional nodes object
   */
  constructor (treeData) {
    // Key value pairs of an id and a node object.
    // Basically this is used like an array but with unique keys
    // whose values don't change.
    Object.assign(this, {
      name: 'default',
      nodes: { 0: new TreeNode('root')},
      lastId: 0,
      ...treeData
    })
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

module.exports = Tree
