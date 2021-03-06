import Keet from '../'
import { html, createModel, getId } from '../utils'

class App extends Keet {
  task = new createModel()
  componentWillMount(){
    // callBatchPoolUpdate - custom method to inform changes in the model.
    // If the component has other states that reflect the model value changes
    // we can safely ignore calling this method.
    this.task.subscribe(model => {
      this.callBatchPoolUpdate()
    })
  }
}

const app = new App()

let name = 'myModel' //rem
//rem
app.mount(html`
  <h1>${name}</h1><!-- //rem -->
  <ul id="list">
    {{model:task}}
    <li id="{{id}}">{{taskName}}
      <input type="checkbox" {{complete?checked:''}}>
    </li>
    {{/model:task}}
  </ul>
`).link('app')

let taskName = ['run', 'jog', 'walk', 'swim', 'roll']

for (let i = 0; i < taskName.length; i++) {
  app.task.add({
    id: i,
    taskName: taskName[i],
    complete: i % 2 ? true : false
  })
}

// update a task
app.task.update('id', {
  id: 0,
  taskName: 'sleep',
  complete: true
})

// remove a task
app.task.destroy('taskName', 'roll')

setTimeout(() => console.assert(getId('list').innerHTML === '<li id="0">sleep<input type="checkbox" checked=""></li><li id="1">jog<input type="checkbox" checked=""></li><li id="2">walk<input type="checkbox"></li><li id="3">swim<input type="checkbox" checked=""></li>', 'model list')) //rem