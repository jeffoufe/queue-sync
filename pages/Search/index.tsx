import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TrackList, TopNavigation, DropdownModal } from '../../components';
import { CHANGE_PROVIDER } from '../../reducers/tracks/constants';
import { PROVIDERS, FETCH_TRACKS } from '../../reducers/tracks/constants';
import { ADD_TO_QUEUE, PLAY_TRACK, NEXT_SONG } from '../../reducers/queue/constants';

interface QueueProps {
    navigation: any
};

export default ({ navigation }: QueueProps) => {
    const [ isModalOpen, setModalOpen ] = useState(true);
    const tracksReducer = useSelector((state: any) => state.tracks);
    const { currentProviderIndex } = tracksReducer;
    const provider = PROVIDERS[currentProviderIndex]. toLowerCase();
    const { loading, tracks } = tracksReducer[provider]
    const dispatch = useDispatch();

    const onSearch = (search: string) => {
        dispatch({ type: FETCH_TRACKS, payload: { search } })
    }
    
    
    const onAddTrackToQueue = (track: any) => {
        dispatch({
            type: ADD_TO_QUEUE,
            payload: { tracks: [track] }
        })
    }

    return (
        <SafeAreaView>
            <TopNavigation 
                onSearch={onSearch} 
                navigation={navigation}
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: navigation.goBack
                }}
                rightControls={[{
                    icon: 'menu-2-outline',
                    onPress: () => setModalOpen(true)
                }]}
            />
            <DropdownModal 
                isOpen={isModalOpen} 
                onCloseModal={() => setModalOpen(false)} 
                options={PROVIDERS}
                title='Choose a provider'
                selectedIndex={currentProviderIndex}
                onChange={(currentProviderIndex: number) => {
                    dispatch({ type: CHANGE_PROVIDER, payload: { currentProviderIndex } })
                }}
            />
            <View>
                <TrackList 
                    tracks={tracks}
                    accessory={{
                        icon: 'list-outline',
                        onPress: (track) => {
                            onAddTrackToQueue(track);
                        }
                    }} 
                />
            </View>
        </SafeAreaView>
    );
}