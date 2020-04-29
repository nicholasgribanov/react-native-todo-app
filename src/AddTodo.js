import React from 'react'
import {View, StyleSheet, TextInput, Button} from 'react-native'

export const AddTodo = props => {
    return (
        <View styles={styles.block}>
            <TextInput />
            <Button title="Добавить"/>
        </View>
    )
};

const styles = StyleSheet.create({
    block: {}
});