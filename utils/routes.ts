import { NewHome, Queue, Settings, Search, Library, Playlist, TrackList } from '../pages';

export type RouteName = 'Home' | 'Search' | 'Queue' | 'Settings' | 'Playlist' | 'Library'

export default [
    {
        Component: Playlist,
        name: 'Playlist'
    },
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
    }
];