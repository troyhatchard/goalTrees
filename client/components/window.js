const eventEmitter = require('events')

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

class Window extends eventEmitter {
  constructor(content) {
    super()
    this.build(content)
  }

  build (content) {
    // create the window
    const $window = this.$window = document.createElement('div')
    $window.classList.add('window')
    $('body').append($window)

    // append window's content
    let $content
    if (content instanceof HTMLElement) {
      $content = content
    } else {
      $content = document.createElement('div')
      $content.append(content)
    }
    $content.classList.add('content')
    $window.append($content)
  }

  close () {
    this.$window.remove()
  }
}

module.exports = Window