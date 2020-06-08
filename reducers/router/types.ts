import { 
    SET_ROUTE
} from './constants';

interface SetRouteAction {
    type: typeof SET_ROUTE,
    payload: { 
        route: string
    }
}

export type RouterAction = SetRouteAction 

export interface RouterReducerState {
    route: null | string
}