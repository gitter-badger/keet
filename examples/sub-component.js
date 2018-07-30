import Keet from '../'
import { getId } from '../components/utils'
import html from 'nanohtml'

class Sub extends Keet {
  // provide the node id where this sub will rendered
  el = 'sub'
}

const sub = new Sub()

sub.mount(html`
  <div id="sub">
  	this is a sub-component
  </div>
`)

class App extends Keet {
   subc = sub
}

const app = new App()

app.mount(html`
  <div id="container">
	{{component:subc}}	
  </div>
`).link('app')

console.assert(getId('sub').innerHTML === 'this is a sub-component', 'sub-component rendering')





