import React from 'react';
import { View, StyleSheet } from 'react-native';  
import { useSelector } from 'react-redux';

interface ContentProps {
    children: React.ReactNode
}

export default ({ children }: ContentProps) => {
    const { tracks } = useSelector((state: any) => state.queue);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            top: 56,
            bottom: tracks.length ? 128 : 56,
            overflowY: 'scroll'
        }
    })

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}