function workLoop(deadline) {
    console.log(deadline.timeRemaining());
    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);