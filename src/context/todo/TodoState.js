import React, { useReducer, useContext, useState } from 'react'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [{ id: '1', title: 'Выучить React Native' },
        { id: '2', title: 'Погладить кота' },
        { id: '3', title: 'Попить пиво за водокачкой' }]
    }

    const { changeScreen } = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = title => dispatch({ type: ADD_TODO, title })
    const removeTodo = id => {
        changeScreen(null)
        dispatch({ type: REMOVE_TODO, id })
    }
    const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

    return <TodoContext.Provider
        value={{
            todos: state.todos,
            addTodo, removeTodo, updateTodo
        }}>
        {children}
    </TodoContext.Provider>
}