import ReactDom from './core/ReactDom.js'
import React from './core/React.js'

const App = React.createElement("div", { id: "app" }, "hello", "world")


ReactDom.createRoot(document.querySelector("#root")).render(App);