interface SpotifyTrack {
    album: {
        images: Array<{
            url: string
        }>
    },
    id: string
    name: string,
    artists: Array<{
        name: string
    }>
}

interface SpotifyArtist {
    name: string
}

interface SpotifyTracksResponse {
    tracks: {
        items: Array<SpotifyTrack>
    }
}

interface SoundCloudTrack {
    artwork_url: string,
    user: {
        full_name: string,
        avatar_url: string,
    },
    title: string,
    id: string
}

interface SoundCloudTracksResponse {
    collection: Array<SoundCloudTrack>
}

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
        artist: track.artists.map((artist: SpotifyArtist) => artist.name).join(', ')
    }))
};

export const formatSoundCloudTracks = (response: SoundCloudTracksResponse) => {
    console.log(response.collection);
    return response.collection.map((track: SoundCloudTrack) => ({
        image: track['artwork_url'] || track.user['avatar_url'],
        artist: track.user['full_name'],
        name: track.title,
        id: track.id

    }));
};