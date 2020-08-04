import { 
    SpotifyTrack,
    SpotifyArtist,
    SpotifyTracksResponse,
    SoundCloudTrack,
    SoundCloudTracksResponse,
    SoundCloudPlaylistsResponse,
    SoundCloudPlaylist
} from './types';
import { SPOTIFY, SOUNDCLOUD } from '../library/constants';

export const getFetchParameters = (provider: number, accessToken: string) => {
    switch (provider) {
        case SPOTIFY: 
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

export const formatSpotifyTracks = (response: SpotifyTracksResponse) => 
    response.tracks.items.map((item: SpotifyTrack) => ({ ...item, type: SPOTIFY }));

export const formatSoundCloudTracks = (response: SoundCloudTracksResponse) => {
    response.collection.map((track: SoundCloudTrack) => ({ ...track, type: SOUNDCLOUD }));
};

export const formatSoundCloudPlaylists = (response: SoundCloudPlaylistsResponse) => {
    return response.collection.slice(0, 8).map((playlist: SoundCloudPlaylist) => ({
        image: playlist.tracks[0]['artwork_url'] || playlist.tracks[0].user['avatar_url'],
        artist: `${playlist.track_count} tracks`,
        name: playlist.title,
        ids: playlist.tracks.map((track: SoundCloudTrack) => track.id),
        id: `${playlist.id}`,
        type: SOUNDCLOUD,
    }))
}