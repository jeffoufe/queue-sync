import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BackHandler, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Layout } from '../../components';
import { canSeePlayer } from '../../utils';
import { RESET_SEARCH } from '../../reducers/tracks/constants';
import { RESET_TRACKLIST } from '../../reducers/trackList/constants'

interface RouteProps {
    navigation: any,
    Component: any
};

export default ({ navigation, Component }: RouteProps) => {
    const route = useRoute();
    const dispatch = useDispatch();

    const resetActions = {
        Search: RESET_SEARCH,
        TrackList: RESET_TRACKLIST
    }

    useEffect(() => {
        const backAction = () => {
            const resetAction = resetActions[route.name];
            if (resetAction) {
                dispatch({ type: resetAction })
            }
            navigation.goBack();
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    if (canSeePlayer(route.name)) {
        return (
            <Layout navigation={navigation}>
                <Component navigation={navigation} route={route.name} />
            </Layout>
        )
    }

    return <Component navigation={navigation} route={route.name} />;
} 