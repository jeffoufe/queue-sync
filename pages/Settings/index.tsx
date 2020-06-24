import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { TopNavigation, SpotifyLogin, DeezerLogin } from '../../components';

interface SettingsProps {
    navigation: any
};

export default ({ navigation }: SettingsProps) => {
    return (
        <SafeAreaView>
            <TopNavigation 
                navigation={navigation} 
                title='Settings'
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: navigation.goBack
                }}
            />
            <View style={styles.container}>
                <SpotifyLogin />
                <DeezerLogin />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
        marginBottom: 10,
        marginTop: 0
    },
});