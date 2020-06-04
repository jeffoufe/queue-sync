import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Spinner, Text, Avatar } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import { Search, TopNavigation, DropdownModal } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PROVIDER } from '../../reducers/tracks/constants';
import { PROVIDERS, FETCH_TRACKS } from '../../reducers/tracks/constants';
import { ADD_TO_QUEUE, PLAY_TRACK, NEXT_SONG } from '../../reducers/queue/constants';

interface HomeProps {
    navigation: any
};

export default ({ navigation }: HomeProps) => {
    const [ isModalOpen, setModalOpen ] = useState(false);
    const tracksReducer = useSelector((state: any) => state.tracks);
    const { currentProviderIndex, search } = tracksReducer;
    const provider = PROVIDERS[currentProviderIndex]. toLowerCase();
    const { loading, tracks } = tracksReducer[provider]
    const dispatch = useDispatch();

    const onSearch = (search: string, index: number = 0) => {
        dispatch({ type: FETCH_TRACKS, payload: { search, index } })
    }

    const onPlayTrack = (track: any) => {
        dispatch({ type: ADD_TO_QUEUE, payload: { tracks: [track] } });
        setTimeout(onClickPlay, 1000);
    } 

    const onClickPlay = () => {
        dispatch({ type: PLAY_TRACK })
    }

    const onClickNext = () => {
        dispatch({ type: NEXT_SONG });
    }

    const onAddTrackToQueue = (track: any) => {
        dispatch({ type: ADD_TO_QUEUE, payload: { tracks: [track] } });
    }

    const renderList = () => tracks.map((track: any, index: number) => (
        <TouchableOpacity key={`track-${index}`} style={styles.track} onPress={() => onPlayTrack(track)}>
            <Avatar source={{ uri: track.image }} />
            <View style={styles.trackInfo}>
                <Text>{track.name}</Text>
                <Text>{track.artist}</Text>
            </View>
            <Button onPress={() => onAddTrackToQueue(track)}>
                ADD TO QUEUE
            </Button>
        </TouchableOpacity>
    ))

    return (
        <SafeAreaView>
            <TopNavigation navigation={navigation} />
            <Search 
                placeholder='Search a track...' 
                onSearch={onSearch} 
                disabled={loading} 
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
            <Button onPress={() => setModalOpen(true)}>Coucou</Button>
            <Button onPress={onClickNext}>Next</Button>
            <Button onPress={onClickPlay}>Play</Button>
            <View style={styles.container}>
                {loading && !tracks.length && (
                    <View style={styles.loading}>
                        <Spinner />
                    </View>
                )}
                {!!tracks.length && (
                    <>
                        <View>
                            {renderList()}
                        </View>
                        <Button
                            onPress={() => onSearch(search, tracks.length)}
                            style={styles.loadMore}
                        >
                            Load More
                        </Button>
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'scroll', 
        height: Dimensions.get('window').height - 146,
        margin: 12,
        marginBottom: 10,
        marginTop: 0
    },
    track: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    trackInfo: {
        marginLeft: 10
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadMore: {
        marginTop: 10,
        marginBottom: 10
    },
    loading: {
        position: "absolute",
        left: '50%',
        top: '50%',
    },
});