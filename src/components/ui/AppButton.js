import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'

export const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR }) => {

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={{ ...styles.button, backgroundColor: color }}>
                <AppTextBold style={styles.text}> {children}</AppTextBold>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    text: {
        color: '#fff'
    }
})