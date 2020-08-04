import { NewHome, Queue, Settings, Search, Library, Playlist, TrackList } from '../pages';

export type RouteName = 'Home' | 'Search' | 'Queue' | 'Settings' | 'Playlist' | 'Library'

export default [
    {
        Component: Queue,
        name: 'Queue'
    },
    {
        Component: Settings,
        name: 'Settings'
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
        Component: NewHome,
        name: 'Home'
    },
    {
        Component: TrackList,
        name: 'TrackList'
    }
];