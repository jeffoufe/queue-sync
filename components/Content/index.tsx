import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';  
import { useSelector } from 'react-redux';

interface ContentProps {
    children: React.ReactNode,
    loading?: boolean
}

export default ({ children, loading }: ContentProps) => {
    const { tracks } = useSelector((state: any) => state.queue);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            top: 56,
            bottom: tracks.length ? 113 : 56,
            overflow: 'scroll'
        },
        loading: {
            position: 'absolute',
            top: Dimensions.get('window').height * 0.5 - 70,
            left: Dimensions.get('window').width * 0.5 - 10,
        }
    })

    return (
        <View style={styles.container}>
            {loading 
                ? (
                    <ActivityIndicator 
                        style={styles.loading} 
                        size="large" 
                        color="#FF6721"
                    /> 
                )
                : children
            }
        </View>
    )
}