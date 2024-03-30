class TreeNode {
    constructor(dom, parent) {
        this.dom = dom;
        this.parent = parent
    }
}

function convertToBinaryTree(el, parent) {
    const dom = createDom(el.type, el.props);
    let binaryRoot = new TreeNode(dom, parent);

    if (el.props.children.length > 0) {
        binaryRoot.left = convertToBinaryTree(el.props.children[0], dom);

        let current = binaryRoot.left;
        for (let i = 1; i < el.props.children.length; i++) {
            current.right = convertToBinaryTree(el.props.children[i], dom);
            current = current.right;
        }
    }

    return binaryRoot;
}

function createTextNode(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => {
                return typeof child === "string"
                    ? createTextNode(child)
                    : child;
            }),
        }
    }
}


function createDom(type, props) {
    const dom = type === "TEXT_ELEMENT" ?
        document.createTextNode(props.nodeValue) :
        document.createElement(type);
    Object.keys(props).forEach((key) => {
        if (key != "children") {
            dom[key] = props[key];
        }
    });
    return dom;
}

function render(el, container) {
    initFiber(el, container)
}

// let fiber = null;

function initFiber(el, container) {
    const tree = convertToBinaryTree(el, container)
    console.log("tee", tree);
    covnert2Link(tree);
    console.log("works", works)
}

let works = [];
function covnert2Link(node) {
    if (!node) {
        return;
    }
    works.push({
        dom: node.dom,
        parent: node.parent,
    })
    covnert2Link(node.left);
    covnert2Link(node.right);
}

function workLoop(deadline) {
    while (works.length > 0 && deadline.timeRemaining() > 1) {
        performWork(works.pop());
    }
    requestIdleCallback(workLoop)
}

/*
fiber = {
    next:,
    parent:
}
*/
function performWork(fiber) {
    if (!fiber) {
        return
    }
    console.log(fiber);
    fiber.parent.append(fiber.dom);
}

// CreateDOM.createRoot(document.querySelector("#root")).render(App);
requestIdleCallback(workLoop);

const React = {
    render,
    createElement,
}

export default React;
