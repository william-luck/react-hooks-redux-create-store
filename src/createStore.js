
// Passing in the reducer so it can generic for any JS application
function createStore(reducer) {
  let state;

  function dispatch(action) {
    // This will call the reducer that is passed through. How can we pass the reducer each time? 
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state
  }

  // We've have dispatch private to the function, but still want to be able to call dispatch in response to user events, so we return an object containing the method, "the store". Why is it an object? Because we are creating the store / object? OOOOOOO OBJECT ORIENTED WITH METHOD. WE CAN CALL store.dispatch. And we can call store.getState to access the value of state.  
  return { 
    dispatch, 
    getState
  }
}


function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { count: state.count + 1 };

    default:
      return state;
  }
}



function render() {
  let container = document.getElementById("container");
  container.textContent = store.getState().count;
}

// Returns the dispatch method in object, the object also contains all the state to be updated (let state). 
// Passes in reducer function
let store = createStore(reducer);
store.dispatch({ type: "@@INIT" });

let button = document.getElementById("button");

button.addEventListener("click", function () {
  store.dispatch({ type: "counter/increment" });
});
