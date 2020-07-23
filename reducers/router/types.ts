import { 
    SET_ROUTE
} from './constants';

interface SetRouteAction {
    type: typeof SET_ROUTE,
    payload: { 
        route: string,
        index: number
    }
}

export type RouterAction = SetRouteAction 

export interface RouterReducerState {
    route: null | string
}