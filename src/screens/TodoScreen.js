import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'

export const TodoScreen = ({ todo, goBack, onRemove, onSave }) => {
    const [modal, setModal] = useState(false)
    const saveHandler = title => {
        onSave(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal
                visible={modal}
                value={todo.title}
                saveTitle={saveHandler}
                closeModal={() => setModal(false)} />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <Button title='Ред.' onPress={() => setModal(true)} />
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR} />
                </View>
                <View style={styles.button}>
                    <Button title='Удалить' onPress={() => onRemove(todo.id)} color={THEME.DANGER_COLOR} />
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
        width: '40%'
    },
    title: {
        fontSize: 20
    }

})
