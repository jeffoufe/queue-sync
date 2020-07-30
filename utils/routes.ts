import { NewHome, Queue, Settings, Search, Library, Playlist, TrackList } from '../pages';

export type RouteName = 'Home' | 'Search' | 'Queue' | 'Settings' | 'Playlist' | 'Library'

export default [
    {
        Component: Queue,
        name: 'Queue'
    },
    {
        Component: Library,
        name: 'Library'
    },
    {
        Component: Playlist,
        name: 'Playlist'
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
        Component: TrackList,
        name: 'TrackList'
    }
];