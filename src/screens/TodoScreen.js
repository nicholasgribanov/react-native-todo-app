import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import {AntDesign, FontAwesome} from '@expo/vector-icons'

import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'

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
                <AppButton onPress={() => setModal(true)}>
                   <FontAwesome name='edit' size={20} /> 
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={goBack} color={THEME.GREY_COLOR}>
                        <AntDesign name='back' size={20} color="#fff" />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton onPress={() => onRemove(todo.id)} color={THEME.DANGER_COLOR}>
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
        width: '40%'
    },
    title: {
        fontSize: 20
    }

})
