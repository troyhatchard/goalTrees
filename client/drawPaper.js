const paper = require('paper')
const treeData = require('./treeData.json')

const config = require('./config/default.json')

const { Tree, TreeNode } = require('./js/Tree')

const $ = document.querySelector.bind(document)

function drawPaper () {
  // PaperJS setup
  const $canvas = $('#canvas')
  paper.setup($canvas)

  /* The next two lines are redundant, but the destructuring allows
   * the editor to know about the paper objects
   */
  const { Point, Size, Rectangle, Path, view, PointText } = paper
  paper.install(this)

  /**************************************
   * Config
  ***************************************/
  const { boxHeight, boxWidth, boxSpacing, minZoom, maxZoom } = config

  /**************************************
   * View
  ***************************************/
  // The size of the view window
  // console.log(view.size)

  function zoom (event) {
    event.preventDefault()
    const wheelClicks = event.deltaY * 0.01

    const mousePoint = view.getEventPoint(event)

    // Zoom
    const newZoom = view.zoom + wheelClicks * -0.1

    if (newZoom > minZoom && newZoom < maxZoom) {
      // When we're zooming in, translate toward the mouse location when zooming
      if (wheelClicks < 0) view.translate(view.center.subtract(mousePoint).multiply(0.25))

      view.zoom = newZoom
    }
  }

  /**************************************
   * Mouse Events
   ***************************************/

  view.onMouseDown = (e) => {
    view.lastMousePoint = e.point
    console.log('lastmousepoint', view.lastMousePoint)
  }
  $canvas.addEventListener('wheel', zoom)

  // Drag to scroll
  view.onMouseDrag = (e) => {
    const lastViewCenter = view.center
    view.center = view.center.add(
      view.lastMousePoint.subtract(e.point)
    )
    view.lastMousePoint = e.point.add(view.center.subtract(lastViewCenter))
  }

  /**************************************
   * Drawing
  ***************************************/

  const tree = new Tree()
  const node1 = new TreeNode('Goal1')
  const node2 = new TreeNode('Goal2')
  const node3 = new TreeNode('Goal3')
  const node4 = new TreeNode('Goal4')
  const node5 = new TreeNode('Goal5')



  tree.addNode(node1)
  tree.addNode(node2, 1)
  tree.addNode(node3, 1)
  tree.addNode(node4, 1)
  tree.addNode(node5, 1)



  // console.log({ nodes: tree.nodes })

  drawNodes(tree.nodes)

  // // Drawing the first row
  // let index = 0
  // for (const goalName in treeData) {
  //   const goal = treeData[goalName]
  //   const point = new Point((index + 1) * boxSpacing + index * boxWidth, boxSpacing)
  //   const rectSize = new Size(boxWidth, boxHeight)
  //   const rect = new Rectangle(point, rectSize)
  //   const node = new GoalNode(goalName, goal.color, rect, goal.children, {})
  //   drawNode(node)
  //   drawChildNodes(node)
  //   index++
  // }

  // // view.zoom = 0.5

  // /**************************************
  //  * Function Definitions
  // ***************************************/
  // // Animate frame event
  // view.onFrame = (event) => {

  // }

  //   /**
  //  * Draw Child Nodes
  //  * @param {object} parentData parent object data
  //  * @param {object} parentData.goal parent goal
  //  * @param {object} parentData.rectangle parent node point
  //  */
  // function drawChildNodes (parent) {
  //   const { children, rectangle } = parent
  //   if (children) {
  //     // Relative position of the subgoal from the center of the parent
  //     let relativePos = 0
  //     relativePos = Math.round(relativePos - Object.keys(children).length / 2)
  //     for (const goalName in children) {
  //       const subGoal = children[goalName]
  //       // Find where to place the subgoal
  //       const parentPoint = new Point(rectangle.bottomCenter)
  //       const point = new Point(parentPoint.subtract(
  //         (
  //           boxWidth * relativePos +
  //           boxSpacing * relativePos +
  //           boxWidth / 2
  //         ),
  //         boxSpacing * -1
  //       ))

  //       const subRect = new Rectangle(point, new Size(boxWidth, boxHeight))
  //       const childNode = new GoalNode(goalName, subGoal.color, subRect, subGoal.children)

  //       // draw the subgoal as a rectangle
  //       drawNode(childNode)

  //       // draw the connecting line
  //       drawConnector(rectangle, subRect)

  //       // increment index
  //       relativePos++
  //     }
  //   }
  // }

  function drawConnector (parentPoint, childPoint) {
    const childElbow = new Point(childPoint.x, (parentPoint.y + childPoint.y) / 2)
    const parentElbow = new Point(parentPoint.x, (parentPoint.y + childPoint.y) / 2)
    const conPath = new Path([parentPoint, parentElbow, childElbow, childPoint])
    conPath.strokeWidth = 2
    conPath.strokeColor = 'black'
  }

  function drawNodes (nodesObject) {

    for (const node of Object.values(nodesObject)) {
      const point = new Point(node.position.x, node.position.y)
      const rectSize = new Size(node.width, node.height)
      const rect = new Rectangle(point, rectSize)

      const rectPath = new Path.Rectangle(rect)
      rectPath.fillColor = 'red'
      rectPath.strokeColor = 'black'

      const pointText = new PointText(rect.center)
      pointText.justification = 'center'
      pointText.fillColor = 'black'
      pointText.content = node.name

      // If node has a parent, draw the connector
      const parentPoint = new Point(node.position.x + (boxWidth / 2), node.position.y + boxHeight)
      for (const childId of node.children) {
        const child = nodesObject[childId]
        // console.log({ childId, nodesObject })
        const childPoint = new Point(child.position.x + (boxWidth / 2), child.position.y)
        drawConnector(parentPoint, childPoint)
      }
    }
  }
}

module.exports = drawPaper
