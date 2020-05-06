import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export const TodoScreen = ({ todo, goBack }) => {
    return (
        <View>
            <Text>{todo.title}</Text>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Назад" onPress={goBack} color='#757575' />
                </View>
                <View style={styles.button}>
                    <Button title='Удалить' onPress={() => console.log('remove')} color='#e53935' />
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
    button: {
        width: '40%'
    }

})
