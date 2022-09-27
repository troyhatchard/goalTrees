
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const { Tree, TreeNode } = require('./models/Tree')
const Window = require('./components/window')

class GTG {
  constructor ($container) {
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
      this.addGoalWindow()
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
        // print the node's children
        node.children.forEach(childId => {
          const child = tree.nodes[childId]
          printWithChildren(child, $childrenContainer)
        })
      } else return
    }
  }

  addGoalWindow () {
    const { tree } = this
    const $form = document.createElement('div')
    $form.classList.add('goalForm')

    // Name Label
    const $nameLabel = document.createElement('label')
    $nameLabel.innerText = 'Goal Name: '
    $form.append($nameLabel)

    // Name Input
    const $nameInput = document.createElement('input')
    $nameInput.type = 'text'
    $nameInput.classList.add('nameInput')
    $form.append($nameInput)

    // Parent Label
    const $parentLabel = document.createElement('label')
    $parentLabel.innerText = 'Parent Goal: '
    $form.append($parentLabel)

    // Parent Input
    const $parentInput = document.createElement('select')
    console.log({ treel: this.tree })
    Object.keys(tree.nodes).forEach(id => {
      const $option = document.createElement('option')
      $option.value = id
      $option.innerText = tree.nodes[id].name
      $parentInput.append($option)
    })
    $form.append($parentInput)

    // Save Button
    const $saveButton = document.createElement('button')
    $saveButton.innerText = 'Save'
    $saveButton.addEventListener('click', () => {
      tree.addNode(new TreeNode($nameInput.value), $parentInput.value)
      this.buildTree()
      $form.parentElement.remove()
    })
    $form.append($saveButton)

    const goalWindow = new Window($form)
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
