import React, { useState, useContext } from 'react'
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './components/Navbar'
import { THEME } from './theme';

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext';



export const MainLayout = () => {
    const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
    const { todoId, changeScreen } = useContext(ScreenContext)

    // const addTodo = (title) => {
    //     setTodos(prev => [
    //         ...prev,
    //         {
    //             id: Date.now().toString(),
    //             title: title
    //         }]);
    // };

    // const removeTodo = id => {
    //     const todo = todos.find(t => t.id === id)
    //     Alert.alert(
    //         "Удаление элемента",
    //         `Вы действительно хотите удалить "${todo.title}"?`,
    //         [
    //             {
    //                 text: "Отмена",
    //                 style: "cancel"
    //             },
    //             {
    //                 text: "Удалить",
    //                 style: 'destructive',
    //                 onPress: () => {
    //                     setTodoId(null);
    //                     setTodos(prev => prev.filter(todo => todo.id !== id));
    //                 }
    //             }
    //         ],
    //         { cancelable: false }
    //     );
    // };


    let content = (
        <MainScreen
            todos={todos}
            removeTodo={removeTodo}
            addTodo={addTodo}
            onOpen={changeScreen} />
    )
    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId);
        content = <TodoScreen
            onRemove={removeTodo}
            todo={selectedTodo}
            goBack={() => changeScreen(null)}
            onSave={updateTodo}
        />
    }


    return (
        <View>
            <Navbar title="Приложение Дяди Коли" />
            <View style={styles.container}>
                {content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    }
});