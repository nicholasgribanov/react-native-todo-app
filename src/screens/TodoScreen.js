import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'

export const TodoScreen = ({ todo, goBack }) => {
    return (
        <View>
            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title='Ред.' />
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR} />
                </View>
                <View style={styles.button}>
                    <Button title='Удалить' onPress={() => console.log('remove')} color={THEME.DANGER_COLOR} />
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
