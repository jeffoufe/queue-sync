import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { TopNavigation } from '../../components';
import { TrackList } from '../../components';

/* const tracks = [
    {
        artist: "ABBA",
        id: "0GjEhVFGZW8afUYGChu3Rr",
        type: 'spotify',
        image: "https://i.scdn.co/image/ab67616d0000485170f7a1b35d5165c85b95a0e0",
        name: "Dancing Queen",
    },
    {
        artist: "ABBA",
        id: "0GjEhVFGZW8afUYGChu3Rr",
        type: 'spotify',
        image: "https://i.scdn.co/image/ab67616d0000485170f7a1b35d5165c85b95a0e0",
        name: "Dancing Queen 2",
    }
] */

interface QueueProps {
    navigation: any
};

export default ({ navigation }: QueueProps) => {
    const { roomName, tracks } = useSelector((state: any) => state.queue);

    const rightControls = [
        {
            icon: 'plus',
            onPress: () => navigation.navigate('Search')
        },
        {
            icon: 'radio-outline',
            onPress: () => navigation.navigate('Settings')
        }
    ]

    return (
        <SafeAreaView>
            <TopNavigation 
                navigation={navigation} 
                title={`${roomName}'s Queue`}
                rightControls={rightControls}
            />
            <View>
                <TrackList 
                    tracks={tracks}
                />
            </View>
        </SafeAreaView>
    );
}