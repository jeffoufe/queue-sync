import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { SET_ROUTE } from '../../reducers/router/constants';

interface RouteProps {
    navigation: any,
    Component: any
};

export default ({ navigation, Component }: RouteProps) => {
    const dispatch = useDispatch();
    const route = useRoute();

    useEffect(() => {
        dispatch({
            type: SET_ROUTE,
            payload: { route: route.name }
        })
    }, [])

    return <Component navigation={navigation} route={route.name} />
} 