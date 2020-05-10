import React from 'react'
import { View, FlatList, StyleSheet, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'


export const MainScreen = ({ addTodo, todos, removeTodo, onOpen }) => {

    let content = (
        <FlatList
            keyExtractor={item => item.id.toString()}
            data={todos}
            renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={onOpen} />}
        />
    )
    if (todos.length === 0) {
        content = <View style={styles.imgWrap}>
            <Image style={styles.image} source={require("../../assets/no-items.png")} />
        </View>
    }
    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})
