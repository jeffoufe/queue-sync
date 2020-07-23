import { RouterAction, RouterReducerState } from './types';
import { SET_ROUTE } from './constants'

const initialState = {
    route: null
}

export default (state: RouterReducerState = initialState, action: RouterAction) => {
    switch (action.type) {
        case SET_ROUTE:
            return { 
                ...state,
                route: action.payload.route,
                index: action.payload.index
            }
        default:
            return state;
    }
  }