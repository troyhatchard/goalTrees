const SharedTree = require('../../shared/Tree')
const axios = require('axios')

class Tree extends SharedTree {
  async save () {
    try {
      const treeData = { ...this }
      console.log('tree.save treedata: ', treeData)

      await axios({
        url: 'trees/save',
        method: 'put',
        data: { treeData }
      })
    } catch (err) { throw err }
  }

  static async load (name) {
    try {
      const { data } = await axios({
        url: `trees/find/${name}`,
        method: 'get'
      })

      console.log('load data', data)

      if (!data) return new Tree({ name })

      return new Tree(data)

    } catch (err) { throw err }
  }
}

module.exports = Tree
