import { resetTodoListInput } from './events'
import { patch, elementOpen, elementClose, elementVoid, text } from 'incremental-dom'
import { ADD_TODO,
        PREPEND_TODO,
        TODO_FILTERS,
        TODO_TOGGLE_DONE,
        SET_TODO_FILTER,
        getVisibleTodos } from './actions'

var features = undefined

export function renderApp(mountEl, state, appFeatures) {
    if (features == undefined)
    features = appFeatures
    patch(mountEl, function() {
        elementOpen('div', null, null, 'id', 'app')
            elementOpen('div', null, null, 'class', 'app-container')
                renderTodoListContainer(renderInput, renderTodoList.bind(null, state.todos), renderFilters.bind(null, state.filter))
            elementClose('div')
        elementClose('div')
    })

    resetTodoListInput()
}

/**
  Incremental-dom
  */

export function patchApp(state, change) {
    switch (change.type) {
        case SET_TODO_FILTER:
            var updatingList = window
                .document
                .getElementById('TodoList-items')

            var todos = getVisibleTodos(state.todos, state.filter)
            patch(updatingList, patchTodoList(todos))
            break
        case PREPEND_TODO:
            prependTodoItem(state.todos[0])
            break
        case ADD_TODO:
            appendTodoItem(state.todos[state.todos.length - 1])
            break
        case TODO_TOGGLE_DONE:
            var updatingList = window
                .document
                .getElementById('TodoList-items')
            patch(updatingList, patchTodoList(state.todos))
            break
    }
}

function appendTodoItem(todoItemData) {
    window.document
        .getElementById('TodoList-items')
        .appendChild(renderTodoItemNode(todoItemData))
}

function prependTodoItem(todoItemData) {
    var container = window.document.getElementById('TodoList-items')
    container
        .insertBefore(renderTodoItemNode(todoItemData), container.firstElementChild)
}

function renderTodoItemNode(todo) {
    var dummyNode = document.createElement('div')
    var todoClass = `${features.renderBottom && !features.filterTop && features.filter ? 'TodoList-items-item-no-top-input' : ''} TodoList-items-item TodoList-items-item-${todo.done ? 'done' : 'open'}`
    dummyNode.innerHTML = `<li class='${todoClass}'><input class='TodoList-items-item-checkbox js_toggle_todo' type='checkbox' data-id='${todo.id}'${todo.done ? ' checked' : ''}>${todo.text}</li>`

    return dummyNode.firstElementChild

}

function patchTodoList(todos) {
    return function() {
        todos.forEach(function(todo) {
            var checked = todo.done ? 'checked' : 'unchecked'
            let todoClass = `${features.renderBottom && !features.filterTop && features.filter ? 'TodoList-items-item-no-top-input' : ''} TodoList-items-item TodoList-items-item-${todo.done ? 'done' : 'open'}`
            elementOpen('li', null, null, 'class', todoClass)
                elementVoid('input', todo.id, ['type', 'checkbox'], 'data-id', todo.id, 'class', 'TodoList-items-item-checkbox js_toggle_todo', checked, true)
                text(todo.text)
            elementClose('li')
        })
    }
}

function renderTodoListContainer(input, todoList, filters) {
    elementOpen('div', null, null, 'id', 'TodoList-container','class', `TodoList-container ${features.filter && !features.filterTop ? 'TodoList-container-filters-bottom' : '' }`)
        elementOpen('div', null, null, 'class', 'TodoList-header')
            text('TofuTodo')
        elementClose('div')
        elementOpen('div', null, null, 'class', 'TodoList-content')
            if (features.filter && features.filterTop && features.renderBottom)
                filters()
            if (!features.renderBottom)
                input()
            todoList()
            if (features.renderBottom)
                input()
            if (features.filter && !features.filterTop)
                filters()
        elementClose('div')
    elementClose('div')
}

function renderInput() {
    elementOpen('div', null, null, 'class', 'TodoList-input-container')
        elementVoid('input', null, ['type', 'text'], 'id', 'TodoList-input', 'class', `TodoList-input-field ${features.renderBottom ? 'TodoList-input-field-bottom' : ''}`)
        elementVoid('button', null, null, 'class', 'TodoList-input-button', 'id', 'addTodo')
    elementClose('div')
}

function renderTodoList(todoItems) {
    elementOpen('div', null, null, 'id', 'TodoList-items', 'class', 'TodoList-items')
        patchTodoList(todoItems)()
    elementClose('div')
}

function renderFilters(filter) {
    var showAllChecked = `${filter === TODO_FILTERS.SHOW_ALL ? 'checked' : 'unchecked'}`
    var showOpenChecked = `${filter === TODO_FILTERS.SHOW_OPEN ? 'checked' : 'unchecked'}`
    var showClosedChecked = `${filter === TODO_FILTERS.SHOW_CLOSED ? 'checked' : 'unchecked'}`
    elementOpen('div', null, null,'id', 'TodoList-filters-container', 'class', 'TodoList-filters-container')
        elementOpen('form')
            elementVoid('input', null, ['type', 'radio', 'name', 'filters'], 'id', 'filter', 'class', 'TodoList-filters-filter', 'value', TODO_FILTERS.SHOW_ALL, showAllChecked, true)
            elementOpen('span', null, null, 'class', 'TodoList-filters-filter-label')
                text('All')
            elementClose('span')
            elementVoid('input', null, ['type', 'radio', 'name', 'filters'], 'id', 'filter', 'class', 'TodoList-filters-filter', 'value', TODO_FILTERS.SHOW_OPEN, showOpenChecked, true)
            elementOpen('span', null, null, 'class', 'TodoList-filters-filter-label')
                text('Open')
            elementClose('span')
            elementVoid('input', null, ['type', 'radio', 'name', 'filters'], 'id', 'filter', 'class', 'TodoList-filters-filter', 'value', TODO_FILTERS.SHOW_CLOSED, showClosedChecked, true)
            elementOpen('span', null, null, 'class', 'TodoList-filters-filter-label')
                text('Closed')
            elementClose('span')
        elementClose('form')
    elementClose('div')
}