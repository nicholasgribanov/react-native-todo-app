import React, { useState, useContext } from 'react'
import { View, StyleSheet, Button, Dimensions } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = () => {
    const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
    const { changeScreen, todoId } = useContext(ScreenContext);
    const [modal, setModal] = useState(false)
    const saveHandler = async title => {
        await updateTodo(todo.id, title)
        setModal(false)
    }

    const todo = todos.find(t => t.id === todoId)

    return (
        <View>
            <EditModal
                visible={modal}
                value={todo.title}
                saveTitle={saveHandler}
                closeModal={() => setModal(false)} />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20} />
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
                        <AntDesign name='back' size={20} color="#fff" />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton onPress={() => removeTodo(todo.id)} color={THEME.DANGER_COLOR}>
                        <FontAwesome name='remove' size={20} color="#fff" />
                    </AppButton>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        padding: 15,
        marginBottom: 20,
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20
    }

})
