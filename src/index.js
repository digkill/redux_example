// import {createStore} from './createStore'
import './styles.css'
import {rootReducer} from "./redux/rootReducer";
import {applyMiddleware, createStore, compose} from 'redux'
import {asyncIncrement, changeTheme, decrement, increment} from "./redux/actions";
import logger from 'redux-logger'

import thunk from 'redux-thunk'

import {composeWithDevTools} from "redux-devtools-extension";

const counter = document.getElementById('counter')

const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')

const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')


// function logger(state) {
//     return function(next) {
//         return function (action) {
//             console.log('State', state.getState())
//             console.log('Action', action)
//             return next(action)
//         }
//     }
// }

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk, logger),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
)

// window.store = store


addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

asyncBtn.addEventListener('click', () => {
    setTimeout(() => {
    }, 1000)
})


themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light'
    store.dispatch(changeTheme(newTheme))
})


store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state.counter
    document.body.className = state.theme.value;

        [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
})
store.dispatch({type: 'INIT_APPLICATION'})
