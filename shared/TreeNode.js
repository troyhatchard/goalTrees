
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

module.exports = TreeNode
