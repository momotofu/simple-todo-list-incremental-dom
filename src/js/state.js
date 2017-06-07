import { createStore } from './lib/state'
import { createUUID } from './lib/math'
import { SET_TODO_FILTER,
        TODO_FILTERS,
        PREPEND_TODO,
        TODO_TOGGLE_DONE,
        ADD_TODO } from './actions'

const initialState = {
    todos: [
        {
            id: createUUID(),
            text: 'Enter #renderBottom in the URL and refresh.',
            done: false
        },
        {
            id: createUUID(),
            text: 'Enter #renderBottom#filter in the URL and refresh.',
            done: false
        },
        {
            id: createUUID(),
            text: 'Enter #renderBottom#filter#filterTop in the URL and refresh.',
            done: false
        },
        {
            id: createUUID(),
            text: 'Test out responsiviness.',
            done: false
        },
        {
            id: createUUID(),
            text: 'Make some whimsicle todos.',
            done: false
        },
        {
            id: createUUID(),
            text: 'Check out source code and incremental-dom.',
            done: false
        },
        {
            id: createUUID(),
            text: 'Use the enter key to add a todo item.',
            done: false
        }
    ],
    filter: TODO_FILTERS.SHOW_ALL
}

function todoChangeHandler(state, change) {
    switch(change.type) {
        case ADD_TODO:
            state.todos.push({
                id: createUUID(),
                text: change.text,
                done: false
            })
            break
        case PREPEND_TODO:
            state.todos.unshift(({
                id: createUUID(),
                text: change.text,
                done: false
            }))
            break
        case TODO_TOGGLE_DONE:
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done
                    break
                }
            }
            break
        case SET_TODO_FILTER:
            state.filter = change.filter
            break
    }
}

export const todos = createStore(todoChangeHandler, initialState)
