import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Playlist } from '../../pages';

interface HeaderProps {
    children: string,
    noMarginTop?: boolean
}

export default (props: HeaderProps) => {
    const styles = StyleSheet.create({
        text: {
            marginTop: props.noMarginTop ? 0 : 15,
            marginBottom: 8,
            color: 'gray'
        }
    })

    return (
        <Text style={styles.text}>
            {props.children}
        </Text>
    );
}