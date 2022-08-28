
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const { Tree, TreeNode } = require('./models/Tree')

class GTG {

  constructor($container) {
    this.$container = $container
    this.tree = new Tree()
    const testChildren = [
      new TreeNode('Health'),
      new TreeNode('Career'),
      new TreeNode('Family')
    ]
    testChildren.forEach((child) => this.tree.addNode(child, 0))
    this.build()
  }

  build () {
    const { $container } = this

    const $controls = $('#controls')
    const $addGoal = $('#addGoal')

    $addGoal.addEventListener('click', () => {
      this.addGoal()
    })
  }

  buildTree () {
    const { $container, tree } = this

    // clear the tree container
    $container.innerHTML = ''

    // start recursive printing with the root node
    printWithChildren(tree.nodes[0], $container)

    // Print a node and all its children recursiels
    function printWithChildren (node, parentEl) {
      // print the node
        $nodeContainer = $('div')
        $parentEl.appendChild($nodeContainer)

        const $node = $('div')
        $node.innerText = node.name
        $nodeContainer.appendChild($node)
      //print the node's children
      node.children.forEach(child => {
        if (child.children && child.children.length) {
          printChildren(child, $nodeContainer)
          return
        } else return

      })
    }


  }

  addGoal (name, parentId) {
    console.log('Adding node')
    const newNode = new TreeNode(name)
    this.tree.addNode(node, parentId)

    // refresh the tree
    this.buildTree()
  }
}

module.exports = GTG