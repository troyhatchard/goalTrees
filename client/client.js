const paper = require('paper')

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
console.log('loaded client.js')

// const $genBoxes = $('#genBoxes')
// $genBoxes.addEventListener('click', newBox)

window.onload = function () {
  drawPaper()
}

const treeData = {
  Career: {
    color: 'red',
    subGoals: {
      'Make 100k': {color: '#ffcccc'},
      'Make 200k': {color: '#ffcccc'},
      'Make 300k': {color: '#ffcccc'}
    }
  },
  Health: {
    color: 'blue'
  },
  Family: {
    color: 'green'
  }

}

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
  const boxHeight = 100
  const boxWidth = 200
  // const boxColor = 'red'
  const boxSpacing = 50
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
    console.log(wheelClicks)

    if (newZoom > minZoom && newZoom < maxZoom) {
      // When we're zooming in, translate toward the mouse location when zooming
      if (wheelClicks < 0) view.translate(view.center.subtract(mousePoint).multiply(0.25))

      view.zoom = newZoom
    }
    console.log('zoom', view.zoom)
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
  function drawChildNodes (parent) {
    console.log(parent)
    const { rectangle, goal } = parent
    const { subGoals } = goal
    if (subGoals) {
      // Relative position of the subgoal from the center of the parent
      let relativePos = 0
      relativePos = Math.round(relativePos - Object.keys(subGoals).length / 2)
      for (const goalName in subGoals) {
        const subGoal = subGoals[goalName]
        console.log(goalName)
        console.log(subGoal)
        console.log('relativePos', relativePos)

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

        // console.log(point)

        // draw the subgoal as a rectangle
        drawNode(point, subGoal.color, goalName)

        // draw the connecting line
        // drawConnector(point, rectangle.bottomCenter)

        // increment index
        relativePos++
      }
    }
  }

  // Drawing the first row
  let index = 0
  for (const goal in treeData) {
    const point = new Point((index + 1) * boxSpacing + index * boxWidth, boxSpacing)
    const rectNode = drawNode(point, treeData[goal].color, goal)
    drawChildNodes({ goal: treeData[goal], rectangle: rectNode })
    index++
  }

  view.zoom = 1

  /**************************************
   * Function Definitions
  ***************************************/
  // Animate frame event
  view.onFrame = (event) => {

  }

  function drawNode (point, fill, text) {
    const rectSize = new Size(boxWidth, boxHeight)
    const rect = new Rectangle(point, rectSize)
    const fillPath = new Path.Rectangle(rect)
    fillPath.fillColor = fill
    const linePath = new Path.Rectangle(rect)
    // linePath.strokeColor = 'black'

    const pointText = new PointText(rect.center)
    pointText.justification = 'center'
    pointText.fillColor = 'black'
    pointText.content = text

    return rect
  }
}
