import React, { useState, useEffect, useContext, useCallback } from 'react'
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { AppLoader } from '../components/ui/AppLoader'


export const MainScreen = () => {
    const { changeScreen } = useContext(ScreenContext);
    const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);

    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
    const loadTodos = useCallback(async () => { await fetchTodos() }, [fetchTodos])
    useEffect(() => {
        loadTodos()
    }, [])

    useEffect(() => {
        const update = () => {
            setDeviceWidth(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
        }
        Dimensions.addEventListener('change', update)
        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    if (loading){
        return <AppLoader />
    }

    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
            />
        </View>
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
