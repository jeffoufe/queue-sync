const generateActions = (reducerName: string, actionName: string) => {
    const prefix = `${reducerName}/${actionName}`;
    return {
        saga: prefix,
        loading: `${prefix}_LOADING`,
        success: `${prefix}_SUCCESS`,
        error: `${prefix}_ERROR`,   
    }
}

export const GET_SPOTIFY_PLAYLIST_ACTIONS = generateActions('TRACKLIST', 'GET_SPOTIFY_PLAYLIST');
export const GO_TO_PLAYLIST = 'TRACKLIST/GO_TO_PLAYLIST';