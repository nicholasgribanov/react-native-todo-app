import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';


export default function App() {
    const [todoId, setTodoId] = useState(null);
    const [todos, setTodos] = useState([
        { id: '1', title: 'Выучить React Native' },
        { id: '2', title: 'Погладить кота' },
        { id: '3', title: 'Попить пиво за водокачкой' }
    ]);

    const addTodo = (title) => {
        setTodos(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title: title
            }]);
    };

    const removeTodo = id => {
        const todo = todos.find(t => t.id === id)
        Alert.alert(
            "Удаление элемента",
            `Вы действительно хотите удалить ${todo.title}?`,
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    style: 'destructive',
                    onPress: () => {
                        setTodoId(null);
                        setTodos(prev => prev.filter(todo => todo.id !== id));
                    }
                }
            ],
            { cancelable: false }
        );
    };

    let content = (
        <MainScreen
            todos={todos}
            removeTodo={removeTodo}
            addTodo={addTodo}
            onOpen={setTodoId} />
    )

    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId);
        content = <TodoScreen onRemove={removeTodo} todo={selectedTodo} goBack={() => setTodoId(null)} />
    }

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container}>
                {content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    }
});
