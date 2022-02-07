
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
    // Nodes {object} // Key value pairs of an id and a node object

  }

  /**
   *
   * @param {TreeNode} treeNode
   * @param {int} parentId // The id number of the parent
   */
  addNode (treeNode, parentId) {
    // Add the node to the array
    const newId = this.nodes.push(treeNode)

    // Add the node's id to the list of children in its parent
    this.nodes[parentId].children.push(newId)

  }
}

module.exports = Tree
