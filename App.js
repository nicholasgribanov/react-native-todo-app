import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navbar} from "./src/navbar";
import {AddTodo} from "./src/AddTodo";
import {Todo} from "./src/Todo";

export default function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (title) => {
        setTodos(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title: title
            }]);
    };

    return (
        <View>
            <Navbar title="Todo App"/>
            <View style={styles.container}>
                <AddTodo onSubmit={addTodo}/>

                <View>
                    {todos.map(todo => {
                        return <Todo todo={todo} key={todo.id}/>
                    })}
                </View>
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
