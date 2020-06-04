import { 
    SpotifyTrack,
    SpotifyArtist,
    SpotifyTracksResponse,
    SoundCloudTrack,
    SoundCloudTracksResponse
} from './types';
import { Audio } from 'expo-av';

export const getFetchParameters = (provider: string, accessToken: string) => {
    switch (provider) {
        case 'spotify': 
            return {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        default: 
            return {}
    }
}

export const formatSpotifyTracks = (response: SpotifyTracksResponse) => {
    return response.tracks.items.map((track: SpotifyTrack) => ({
        image: track.album.images[track.album.images.length - 1].url,
        name: track.name,
        id: track.id,
        type: 'spotify',
        artist: track.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
    }))
};

export const formatSoundCloudTracks = (response: SoundCloudTracksResponse) => {
    console.log(response.collection);
    return response.collection.map((track: SoundCloudTrack) => ({
        image: track['artwork_url'] || track.user['avatar_url'],
        artist: track.user['full_name'],
        name: track.title,
        id: track.id,
        type: 'soundcloud',
        soundObject: new Audio.Sound(),
        url: `${track.media.transcodings.filter(
            transcoding => transcoding.format.protocol === 'progressive'
        )[0].url}?client_id=aybGMKN6zsjDmDCOGHLx6POpkd9naasI`
    }));
};