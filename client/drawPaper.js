const paper = require('paper')
const treeData = require('./treeData.json')

const GoalNode = require('./GoalNode')

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
   * This is my config secion. Probably will put this outside the file at some point and have it
   * editable by the user
  ***************************************/
  const boxHeight = 30
  const boxWidth = 60
  // const boxColor = 'red'
  const boxSpacing = 15
  const minZoom = 0.1
  const maxZoom = 2

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

  /**
   * Draw Child Nodes
   * @param {object} parentData parent object data
   * @param {object} parentData.goal parent goal
   * @param {object} parentData.rectangle parent node point
   */

  // Drawing the first row
  let index = 0
  for (const goalName in treeData) {
    const goal = treeData[goalName]
    const point = new Point((index + 1) * boxSpacing + index * boxWidth, boxSpacing)
    const rectSize = new Size(boxWidth, boxHeight)
    const rect = new Rectangle(point, rectSize)
    const node = new GoalNode(goalName, goal.color, rect, goal.children, {})
    drawNode(node)
    drawChildNodes(node)
    index++
  }

  // view.zoom = 0.5

  /**************************************
   * Function Definitions
  ***************************************/
  // Animate frame event
  view.onFrame = (event) => {

  }

  function drawChildNodes (parent) {
    const { children, rectangle } = parent
    if (children) {
      // Relative position of the subgoal from the center of the parent
      let relativePos = 0
      relativePos = Math.round(relativePos - Object.keys(children).length / 2)
      for (const goalName in children) {
        const subGoal = children[goalName]
        // Find where to place the subgoal
        const parentPoint = new Point(rectangle.bottomCenter)
        const point = new Point(parentPoint.subtract(
          (
            boxWidth * relativePos +
            boxSpacing * relativePos +
            boxWidth / 2
          ),
          boxSpacing * -1
        ))

        const subRect = new Rectangle(point, new Size(boxWidth, boxHeight))
        const childNode = new GoalNode(goalName, subGoal.color, subRect, subGoal.children)

        // draw the subgoal as a rectangle
        drawNode(childNode)

        // draw the connecting line
        drawConnector(rectangle, subRect)

        // increment index
        relativePos++
      }
    }
  }

  function drawConnector (parent, child) {
    const parentPoint = parent.bottomCenter
    const childPoint = child.topCenter

    const childElbow = new Point(childPoint.x, (parentPoint.y + childPoint.y) / 2)
    const parentElbow = new Point(parentPoint.x, (parentPoint.y + childPoint.y) / 2)
    const conPath = new Path([parentPoint, parentElbow, childElbow, childPoint])
    conPath.strokeColor = 'black'
    console.log('Path', conPath)
  }

  function drawNode (node) {
    const { rectangle, color, name, options } = node
    const fillPath = new Path.Rectangle(rectangle)
    fillPath.fillColor = color
    if (options && options.border) {
      const linePath = new Path.Rectangle(rectangle)
      linePath.strokeColor = 'black'
    }

    const pointText = new PointText(rectangle.center)
    pointText.justification = 'center'
    pointText.fillColor = 'black'
    pointText.content = name
  }
}

module.exports = drawPaper
