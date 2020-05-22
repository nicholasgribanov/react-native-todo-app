import React, { useReducer, useContext, useState } from 'react'
import { Alert } from 'react-native'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types'
import { ScreenContext } from '../screen/screenContext'
import { Http } from '../../http'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const { changeScreen } = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const data = await Http.get('https://rn-todo-app-50f22.firebaseio.com/todos.json')
            const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
            dispatch({ type: FETCH_TODOS, todos })
        } catch (e) {
            console.log(e)
            showError('Ошибка загрузки с сервера')
        } finally {
            hideLoader()
        }
    }

    const addTodo = async title => {
        clearError()
        try {
            const data = await Http.post('https://rn-todo-app-50f22.firebaseio.com/todos.json', { title });
            dispatch({ type: ADD_TODO, title, id: data.name })
        } catch (e) {
            showError('Что-то пошло не так!')
        }

    }
    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
            "Удаление элемента",
            `Вы действительно хотите удалить "${todo.title}"?`,
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    style: 'destructive',
                    onPress: async () => {
                        changeScreen(null)
                        await Http.delete(`https://rn-todo-app-50f22.firebaseio.com/todos/${id}.json`)
                        dispatch({ type: REMOVE_TODO, id })
                    }
                }
            ],
            { cancelable: false }
        );

    }
    const updateTodo = async (id, title) => {
        clearError()
        try {
            await Http.patch(`https://rn-todo-app-50f22.firebaseio.com/todos/${id}.json`, { title })
            dispatch({ type: UPDATE_TODO, id, title })
        } catch (e) {
            console.log(e)
            showError('Ошибка загрузки с сервера')
        }

    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = (error) => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return <TodoContext.Provider
        value={{
            todos: state.todos,
            addTodo, removeTodo, updateTodo, fetchTodos,
            error: state.error,
            loading: state.loading,
            fetchTodos
        }}>
        {children}
    </TodoContext.Provider>
}