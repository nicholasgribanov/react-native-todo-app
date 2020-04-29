import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navbar} from "./src/navbar";
import {AddTodo} from "./src/AddTodo";

export default function App() {
    return (
        <View style={styles.container}>
            <Navbar title="Todo App" />
            <AddTodo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {}
});
