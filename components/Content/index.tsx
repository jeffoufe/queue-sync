import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, StatusBar } from 'react-native';  
import { useSelector } from 'react-redux';

interface ContentProps {
    children: React.ReactNode,
    loading?: boolean,
    noPadding?: boolean
}

export default ({ children, loading, noPadding }: ContentProps) => {
    const { tracks } = useSelector((state: any) => state.queue);
    const { selectedTrack } = useSelector((state: any) => state.library);

    const bottom = (() => {
        if (!!selectedTrack) {
            return 0;
        }
        if (tracks.length) {
            return 113;
        }
        return 55
    })()

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            top: 56 + (StatusBar.currentHeight || 0),
            padding: noPadding ? 0 : 15,
            bottom,
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