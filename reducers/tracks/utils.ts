import { 
    SpotifyTrack,
    SpotifyArtist,
    SpotifyTracksResponse,
    SoundCloudTrack,
    SoundCloudTracksResponse,
    SoundCloudPlaylistsResponse,
    SoundCloudPlaylist
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

export const formatSpotifyTrack = (track: SpotifyTrack) => ({
    image: track.album.images[track.album.images.length - 1].url,
    name: track.name,
    id: `${track.id}`,
    isPlayed: false,
    type: 'spotify',
    duration: track['duration_ms'],
    artist: track.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
})

export const formatSpotifyTracks = (response: SpotifyTracksResponse) => {
    return response.tracks.items.map(formatSpotifyTrack)
};

export const formatSoundCloudTrack = (track: SoundCloudTrack) => {
    let stream;
    if (track && track.media && track.media.transcodings) {
        stream = track.media.transcodings.filter(
            transcoding => transcoding.format.protocol === 'progressive'
        )[0];
    }
    if (!stream) return null;
    return {
        image: track['artwork_url'] || track.user['avatar_url'],
        artist: track.user.username || track.user['full_name'],
        name: track.title,
        id: `${track.id}`,
        type: 'soundcloud',
        isPlayed: false,
        url: `${stream.url}?client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX`
    }
}

export const formatSoundCloudTracks = (response: SoundCloudTracksResponse) => {
    return response.collection.reduce((accumulator: Array<SoundCloudTrack>, track: SoundCloudTrack) => {
        const formattedTrack = formatSoundCloudTrack(track);
        if (!formattedTrack) return accumulator
        return [
            ...accumulator,
            formattedTrack
        ]
    }, []);
};

export const formatSoundCloudPlaylists = (response: SoundCloudPlaylistsResponse) => {
    return response.collection.slice(0, 8).map((playlist: SoundCloudPlaylist) => ({
        image: playlist.tracks[0]['artwork_url'] || playlist.tracks[0].user['avatar_url'],
        artist: `${playlist.track_count} tracks`,
        name: playlist.title,
        ids: playlist.tracks.map((track: SoundCloudTrack) => track.id),
        id: `${playlist.id}`,
        type: 'soundcloud',
    }))
}