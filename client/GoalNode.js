class GoalNode {
  /**
   *
   * @param {string} name
   * @param {string} color
   * @param {paper.Rectangle} rectangle
   * @param {object} children
   * @param {object} options
   */
  constructor (name, color, rectangle, children, options) {
    this.name = name
    this.color = color
    this.rectangle = rectangle
    this.children = children
    this.options = options
  }
}

module.exports = GoalNode
