
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
    this.buildTree()
  }

  buildTree () {
    const { $container, tree } = this

    console.log({ tree })
    // clear the tree container
    $container.innerHTML = ''

    // start recursive printing with the root node
    printWithChildren(tree.nodes[0], $container)

    // Print a node and all its children recursiels
    function printWithChildren (node, $parentEl) {
      // print the node
        const $branchContainer = document.createElement('div')
        $parentEl.appendChild($branchContainer)
        $branchContainer.classList.add('branch-container')

        const $goalContainer = document.createElement('div')
        $goalContainer.classList.add('goal-container')

        $branchContainer.appendChild($goalContainer)

        const $node = document.createElement('div')
        $node.classList.add('goal')
        $node.innerText = node.name
        $goalContainer.appendChild($node)

        const $childrenContainer = document.createElement('div')
        $childrenContainer.classList.add('children-container')
        $branchContainer.appendChild($childrenContainer)

        console.log({ children: node.children })
        if (node.children && node.children.length) {
          //print the node's children
          node.children.forEach(childId => {
              const child = tree.nodes[childId]
              printWithChildren(child, $childrenContainer)
              return
            })
          } else return
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