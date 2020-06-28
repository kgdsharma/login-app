import React from 'react';
import ReachDOM from 'react-dom'
import App from './components/App'

// const App = ()=>{
//   return (
//   <div>
//     <div class="mdc-card">
//     <label for="name">Username</label>
//     <input id="name" type="text" />
//     <label for="phonenumber">Phone Number</label>
//     <input id="phonenumber" type="text" />
//     <button>Submit</button>
//     </div>
//   </div>
//   )
// }

ReachDOM.render(
  <App/>,
  document.querySelector('#root')
);