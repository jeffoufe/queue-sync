import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { TopNavigation, SpotifyLogin } from '../../components';
import { useDispatch, useSelector } from 'react-redux';

interface SettingsProps {
    navigation: any
};

export default ({ navigation }: SettingsProps) => {
    const { user } = useSelector((state: any) => state.tracks)
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <TopNavigation navigation={navigation} />
            <View style={styles.container}>
                <SpotifyLogin />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'scroll', 
        // height: 'calc(100vh - 116px)',
        margin: 12,
        marginBottom: 10,
        marginTop: 0
    },
});