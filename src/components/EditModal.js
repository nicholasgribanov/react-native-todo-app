import React, { useState } from 'react'
import { Modal, View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({ visible, closeModal, value, saveTitle }) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка!', `Минимальная длина названия 3 символа. Текущая длина ${title.trim().length}`)
        } else {
            saveTitle(title)
        }
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Введите текст...'
                    autoCorrect={false}
                    autoCapitalize='none'
                    maxLength={64}
                />
                <View style={styles.buttons}>
                    <Button title='Отменить' onPress={closeModal} color={THEME.DANGER_COLOR} />
                    <Button title='Сохранить' onPress={saveHandler} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    }
})