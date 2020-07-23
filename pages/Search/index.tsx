import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrackList, TopNavigation, DropdownModal, Content } from '../../components';
import { CHANGE_PROVIDER } from '../../reducers/tracks/constants';
import { PROVIDERS, FETCH_TRACKS } from '../../reducers/tracks/constants';
import {  ADD_TO_QUEUE_ACTIONS } from '../../reducers/queue/constants';

interface QueueProps {
    navigation: any
};

export default ({ navigation }: QueueProps) => {
    const [ isModalOpen, setModalOpen ] = useState(true);
    const { _id } = useSelector((state: any) => state.queue);
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
            type: ADD_TO_QUEUE_ACTIONS.saga,
            payload: { track },
            urlParams: { id: _id }
        })
    }

    return (
        <>
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
            <Content>
                <TrackList 
                    tracks={tracks}
                    onPressPlay
                    accessory={{
                        icon: 'plus',
                        onPress: onAddTrackToQueue
                    }} 
                />
            </Content>
        </>
    );
}