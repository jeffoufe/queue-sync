import { 
    SpotifyTrack,
    SpotifyArtist,
    SpotifyTracksResponse,
    SoundCloudTrack,
    SoundCloudTracksResponse
} from './types';

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

export const formatYouTubeTracks = (response: any) => {
    return response.items.slice(0, 8).map((track: any) => ({
        image: track.snippet.thumbnails.default.url,
        name: track.snippet.title,
        id: `${track.id.videoId}`,
        file: "",
        isPlayed: false,
        type: 'youtube',
        artist: track.snippet.channelTitle
    }))
};

export const formatSpotifyTracks = (response: SpotifyTracksResponse) => {
    return response.tracks.items.slice(0, 8).map((track: SpotifyTrack) => ({
        image: track.album.images[track.album.images.length - 1].url,
        name: track.name,
        id: `${track.id}`,
        isPlayed: false,
        type: 'spotify',
        duration: track['duration_ms'],
        artist: track.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
    }))
};

export const formatSoundCloudTracks = (response: SoundCloudTracksResponse) => {
    return response.collection.slice(0, 8).reduce((accumulator: Array<SoundCloudTrack>, track: SoundCloudTrack) => {
        const stream = track.media.transcodings.filter(
            transcoding => transcoding.format.protocol === 'progressive'
        )[0];
        if (!stream) return accumulator
        return [
            ...accumulator,
            {
                image: track['artwork_url'] || track.user['avatar_url'],
                artist: track.user.username || track.user['full_name'],
                name: track.title,
                id: `${track.id}`,
                type: 'soundcloud',
                isPlayed: false,
                url: `${stream.url}?client_id=daZlxLpZTSroZXmrbXa6hiLt8ub6Qm7X`
            }
        ]
    }, []);
};