import { 
    formatSpotifyTracks,
    formatSoundCloudTracks
} from './utils';

export const CHANGE_PROVIDER = 'TRACKS/CHANGE_PROVIDER';
export const FETCH_TRACKS = 'TRACKS/FETCH_TRACKS';
export const FETCH_TRACKS_LOADING = 'TRACKS/FETCH_TRACKS_LOADING';
export const FETCH_TRACKS_SUCCESS = 'TRACKS/FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_ERROR = 'TRACKS/FETCH_TRACKS_ERROR'

export const TRANSFORMS = [
    formatSpotifyTracks,
    formatSoundCloudTracks
]

export const PROVIDERS = [
    'Spotify',
    'SoundCloud'
];

export const SEARCH_URLS = [
    (search: string, index: number) => `https://api.spotify.com/v1/search?q=${search}&offset=${index}&type=track`,
    (search: string) => `https://api-v2.soundcloud.com/search/tracks?q=${search}&client_id=iY8sfHHuO2UsXy1QOlxthZoMJEY9v0eI`
];