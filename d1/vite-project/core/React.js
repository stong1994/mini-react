
// v1
// const dom = document.createElement("div")
// dom.id = "app"
// document.querySelector("#root").append(dom)

// const textNode = document.createTextNode("")
// textNode.nodeValue = "app"
// dom.append(textNode)


// v2 react -> vdom js object
// const textEl = {
//     type: "TEXT_ELEMENT",
//     props: {
//         nodeValue: "app",
//         children: [],
//     }
// }

function createTextNode(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

// const el = {
//     type: "div",
//     props: {
//         id: "app",
//         children: [textEl]
//     }
// }

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => {
                return typeof child === "string" 
                ?createTextNode(child)
                :child;
            }),
        }
    }
}



// const dom = document.createElement(App.type)
// dom.id = App.props.id
// document.querySelector("#root").append(dom)

// const textNode = document.createTextNode("")
// textNode.nodeValue = textEl.props.nodeValue
// dom.append(textNode)

function render(el, container) {
    console.log("el type", el.type);
    const dom = el.type === "TEXT_ELEMENT" ?
        document.createTextNode(el.props.nodeValue) :
        document.createElement(el.type);

    console.log("el props", el.props);
    // id class
    Object.keys(el.props).forEach((key) => {
        if (key != "children") {
            dom[key] = el.props[key];
        }
    });
    console.log("children", el.props.children)
    el.props.children.forEach((child) => {
        console.log("foreach", child)
        render(child, dom);
    });

    container.append(dom);
}

// const textEl = createTextNode("app")
// const App = createElement("div", { id: "app" }, textEl)


// const CreateDOM = {
//     createRoot(container) {
//         return {
//             render(App) {
//                 render(App, container);
//             },
//         }
//     }
// }

// CreateDOM.createRoot(document.querySelector("#root")).render(App);

const React = {
    render,
    createElement,
}

export default React;
