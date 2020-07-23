const generateActions = (reducerName: string, actionName: string) => {
    const prefix = `${reducerName}/${actionName}`;
    return {
        saga: prefix,
        loading: `${prefix}_LOADING`,
        success: `${prefix}_SUCCESS`,
        error: `${prefix}_ERROR`,   
    }
}

export const GET_SPOTIFY_PLAYLISTS_ACTIONS = generateActions('LIBRARY', 'GET_SPOTIFY_PLAYLISTS')

