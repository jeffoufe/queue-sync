import { NewHome, Queue, Settings, Search, Library, SpotifyPlaylists, TrackList } from '../pages';

export type RouteName = 'NewHome' | 'Search' | 'Queue' | 'Settings'

export default [
    {
        Component: Queue,
        name: 'Queue'
    },
    {
        Component: Search,
        name: 'Search'
    },
    {
        Component: Settings,
        name: 'Settings'
    },
    {
        Component: NewHome,
        name: 'Home'
    },
    {
        Component: Library,
        name: 'Library'
    },
    {
        Component: TrackList,
        name: 'TrackList'
    },
    {
        Component: SpotifyPlaylists,
        name: 'SpotifyPlaylists'
    }
];