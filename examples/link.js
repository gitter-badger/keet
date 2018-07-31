import Keet from '../'

class App extends Keet {
  componentWillMount () {
    this.isWillMount = true
  }
}

const app = new App()

app.mount('test').link('app')

console.assert(app.isWillMount, 'link, componentWillMount')

export default app
