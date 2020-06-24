import { 
    formatSpotifyTracks,
    formatSoundCloudTracks,
    formatYouTubeTracks
} from './utils';

export const CHANGE_PROVIDER = 'TRACKS/CHANGE_PROVIDER';
export const FETCH_TRACKS = 'TRACKS/FETCH_TRACKS';
export const FETCH_TRACKS_LOADING = 'TRACKS/FETCH_TRACKS_LOADING';
export const FETCH_TRACKS_SUCCESS = 'TRACKS/FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_ERROR = 'TRACKS/FETCH_TRACKS_ERROR';

export const TRANSFORMS = [
    formatSpotifyTracks,
    formatSoundCloudTracks,
    formatYouTubeTracks
]

export const PROVIDERS = [
    'Spotify',
    'SoundCloud',
    'YouTube'
];

export const SEARCH_URLS = [
    (search: string) => `https://api.spotify.com/v1/search?q=${search}&type=track`,
    (search: string) => `https://api-v2.soundcloud.com/search/tracks?q=${search}&client_id=ort1mNnec7uBq15sMpCNm5oPUYUpu1oV`,
    (search: string) => `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${search}&videoEmbeddable=true&key=AIzaSyBYz0xOFTbAL-4jybPOXYVe5PZT7wTRDrw`
];