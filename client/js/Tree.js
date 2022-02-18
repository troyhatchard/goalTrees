const config = require('../config/default.json')
const Paper = require('paper')

const { boxHeight, boxWidth, boxSpacing } = config

class TreeNode {
  constructor (name, options) {
    Object.assign(this, {
      name,
      height: options && options.height ? options.height : boxHeight,
      width: options && options.width ? options.width : boxWidth,
      children: []

    })
  }

  rightBound () {
    return position.x + width
  }

  leftBound () {
    return position.x
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
    this.lastId = 0


  }

  /**
   *
   * @param {TreeNode} treeNode
   * @param {int} parentId // The id number of the parent
   */
  addNode (node, parentId) {
    const { nodes, lastId } = this
    // Add the node to the nodes object
    const newId = lastId + 1

    // Add the node's id to the list of children in its parent
    // When we add a new node, we need to reposition the children in the tree to make sure none are overlapping
    if (parentId) {
      const parent = nodes[parentId]
      const { children } = parent
      children.push(newId)

      const sectionWidth = boxWidth + boxSpacing


      for (const childIndex in children) {
        // For all the existing nodes, get them from the nodelist
        const currentNode = nodes[children[childIndex]] || node

        // Calculate the position based on the parent
        const sectionNum = children.length
        const rowWidth = sectionNum * sectionWidth

        // We add the childIndex * sectionWidth to parent position get the node's startingx
        // relative to the parent. Then we subtract half of rowWidth to center the row on the parent
        let nodeX = parent.position.x + (childIndex * sectionWidth) - (rowWidth / 2) + (sectionWidth / 2)

        // If it's an odd number, we need to subtract half a sectionWidth to center the row
        // nodeX = sectionNum % 2 !== 0 ? nodeX - sectionWidth / 2 : nodeX

        console.log({ nodeX, children: children, childIndex, parentPos: parent.position.x, sectionWidth, rowWidth })

        currentNode.setPosition(nodeX, parent.position.y + parent.height + boxSpacing)
      }
    } else {

      node.position = { x: 0, y: 0 }
    }
    nodes[newId] = node

    // Set the last id so the next node can be added on the next call to this function
    this.lastId = newId


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
