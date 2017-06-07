import {todos} from './state'
import {listen} from './lib/events'
import {addTodo, prependTodo, toggleTodoState, setTodoFilter} from './actions'

export function registerEventHandlers(features) {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('TodoList-input')
        if (todoInput.value.length > 0) {
            if (features.renderBottom)
                todos.dispatch(addTodo(todoInput.value))
            else
                todos.dispatch(prependTodo(todoInput.value))
        }
        resetTodoListInput()
        event.stopPropagation()
    })

    listen('click', '.js_toggle_todo', event => {
        const id = event.target.getAttribute('data-id')
        todos.dispatch(toggleTodoState(id))
        event.stopPropagation()
    })

    listen('click', '#filter', event => {
        todos.dispatch(setTodoFilter(event.target.value))
        event.stopPropagation()
        blur(document.getElementById('TodoList-filters-container'))
    })

    listen('keyup', '#TodoList-input', event => {
        if (event.keyCode === 13) {
            const todoInput = document.getElementById('TodoList-input')
            if (todoInput.value.length > 0) {
                if (features.renderBottom)
                    todos.dispatch(addTodo(todoInput.value))
                else
                    todos.dispatch(prependTodo(todoInput.value))
            }
            resetTodoListInput()
        }
        event.stopPropagation()
    })
}

export function resetTodoListInput() {
    const todoInput = window.document.getElementById('TodoList-input')
    todoInput.value = ''
    todoInput.focus()
}

function blur(target){
    let ghost = document.createElement('input');
    ghost.style.opacity = 0;
    target.appendChild(ghost)
    ghost.focus()
    target.removeChild(ghost)
}