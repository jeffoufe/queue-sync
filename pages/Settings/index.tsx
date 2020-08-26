import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TopNavigation, SpotifyLogin, DeezerLogin, Content } from '../../components';

interface SettingsProps {
    navigation: any
};

export default ({ navigation }: SettingsProps) => {
    return (
        <>
            <TopNavigation 
                navigation={navigation} 
                title='Settings'
            />
            <Content>
                <View style={styles.container}>
                    <SpotifyLogin />
                    {false && <DeezerLogin />}
                </View>
            </Content>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
        marginBottom: 10,
        marginTop: 0
    },
});