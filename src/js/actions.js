export const TODO_TOGGLE_DONE = 'TODO_TOGGLE_DONE'

export function toggleTodoState(id) {
    return {
        type: TODO_TOGGLE_DONE,
        id
    };
}

export const ADD_TODO = 'ADD_TODO'

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export const PREPEND_TODO = 'PREPEND_TODO'

export const prependTodo = (text) => {
  return {
    type: PREPEND_TODO,
    text
  }
}

export function getVisibleTodos(todos, filter) {
  switch (filter) {
    case TODO_FILTERS.SHOW_ALL:
      return todos;
    case TODO_FILTERS.SHOW_OPEN:
      return todos.filter(item => !item.done);
    case TODO_FILTERS.SHOW_CLOSED:
      return todos.filter(item => item.done);
    default:
      return todos;
  }
}

/**
  * Visiblity Filters
  */
export const SET_TODO_FILTER = 'SET_TODO_FILTER'

export const TODO_FILTERS = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_OPEN: 'SHOW_OPEN',
  SHOW_CLOSED: 'SHOW_CLOSED'
}

export const setTodoFilter = (filter) => {
  return {
    type: SET_TODO_FILTER,
    filter
  }
}