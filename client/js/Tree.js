const config = require('../config/default.json')
const Paper = require('paper')

const { boxHeight, boxWidth, boxSpacing } = config

class TreeNode {
  constructor (name, options) {
    Object.assign(this, {
      name,
      height: options && options.height ? options.height : boxHeight,
      width: options && options.width ? options.width : boxWidth,
      position: { x: 0, y: 0},
      tree: null,
      children: [],
      parentId: null

    })
  }

  rightBound () {
    return position.x + width
  }

  leftBound () {
    return position.x
  }

  childrenBounds () {
    let left = this.position.x
    let right = this.position.x

    console.log({ left })
    this.children.forEach(childIndex => {
      const childNode = this.tree.nodes[childIndex]
      console.log({ childIndex, treeNodes: this.tree.nodes, childNode })
      if (childNode.position.x < left) left = childNode.position.x
      const childRight = childNode.position.x + boxWidth
      if (childRight > right) right = childRight
    })
    return ({left, right})
  }

  // Calculate the y position of the node's children
  childrenY () {
    return this.position.y + this.height + boxSpacing
  }

  setPosition(x, y) {
    this.position = { x, y }
  }

}

// Tree data structure
class Tree {
  constructor () {
    // Key value pairs of an id and a node object. Basically this is used like an array but with unique keys
    // whose values don't change.
    this.nodes = {}
    this.rows = {}
    this.lastId = 0
    this.nextParent = 0
  }

  /**
   *
   * @param {TreeNode} node
   * @param {int} parentId // The id number of the parent
   */
  addNode (node, parentId) {
    let { nodes, lastId, nextParent } = this
    // Add the node to the nodes object
    node.tree = this
    const newId = lastId + 1

    // Add the node's id to the list of children in its parent
    // When we add a new node, we need to reposition the children in the tree to make sure none are overlapping
    if (parentId) {
      node.parentId = parentId
      const parent = nodes[parentId]
      const { children } = parent

      const sectionWidth = boxWidth + boxSpacing
      let nodeX = parent.childrenBounds().right
      if (parent.children.length > 0) nodeX = nodeX + boxSpacing
      node.setPosition(nodeX, parent.childrenY())

      children.push(newId)

      nodes[newId] = node

      this.shiftParent(parent)

      // for (const childIndex in children) {
      //   // For all the existing nodes, get them from the nodelist
      //   const currentNode = nodes[children[childIndex]] || node

      //   // Calculate the position based on the parent
      //   const sectionNum = children.length
      //   const rowWidth = sectionNum * sectionWidth

      //   // We add the childIndex * sectionWidth to parent position get the node's startingx
      //   // relative to the parent. Then we subtract half of rowWidth to center the row on the parent
      //   let nodeX = parent.position.x + (childIndex * sectionWidth) - (rowWidth / 2) + (sectionWidth / 2)

      //   // If it's an odd number, we need to subtract half a sectionWidth to center the row
      //   // nodeX = sectionNum % 2 !== 0 ? nodeX - sectionWidth / 2 : nodeX

      //   console.log({ nodeX, children: children, childIndex, parentPos: parent.position.x, sectionWidth, rowWidth })

      //   currentNode.setPosition(nodeX, parent.position.y + parent.height + boxSpacing)
      // }
    } else {

      node.position = { x: nextParent, y: 0 }

      nextParent = nextParent + boxSpacing + boxWidth
      nodes[newId] = node
    }

    // Finally add the node to the node list

    // Set the last id so the next node can be added on the next call to this function
    this.lastId = newId


  }

  shiftParent (parent) {
    if (parent.parentId)
    // Find the siblings bounds so we can put the parent in the center of them.
    const newSiblingBounds = parent.childrenBounds()
    const siblingWidth = newSiblingBounds.right - newSiblingBounds.left
    parent.setPosition(newSiblingBounds.left + siblingWidth / 2 - boxWidth / 2, parent.position.y)
  }

  /**
   *
   * @param {Paper} paper
   */
  draw (paper) {
    const { Point, Size, Rectangle, Path, view, PointText } = paper

    for (const node of Object.values(this.nodes)) {
      const point = new Point(node.position.x, node.position.y)
      const rectSize = new Size(node.width, node.height)
      const rect = new Rectangle(point, rectSize)

      const rectPath = new Path.Rectangle(rect)
      rectPath.fillColor = 'red'
      rectPath.strokeColor = 'black'
    }

  }
}

module.exports.TreeNode = TreeNode
module.exports.Tree = Tree
