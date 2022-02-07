
class TreeNode {
  constructor (position, height, width, name) {
    Object.assign(this, {
      name,
      position,
      height,
      width,
      children: null

    })
  }

  rightBound () {
    return position.x + width
  }

  leftBound () {
    return position.x
  }

}

// Tree data structure
class Tree {
  constructor (treeData) {
    // Key value pairs of an id and a node object. Basically this is used like an array but with unique keys
    // whose values don't change.
    // Nodes {object}
    this.lastId = 0

  }

  /**
   *
   * @param {TreeNode} treeNode
   * @param {int} parentId // The id number of the parent
   */
  addNode (treeNode, parentId) {
    const { nodes } = this
    // Add the node to the nodes object
    const newId = lastId + 1
    nodes.newId = treeNode

    // Add the node's id to the list of children in its parent
    nodes[parentId].children.push(newId)

    // Set the last id so the next node can be added on the next call to this function
    this.lastId = newId

  }
}

module.exports = Tree
