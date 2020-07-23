import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Layout } from '../../components';
import { canSeePlayer } from '../../utils';

interface RouteProps {
    navigation: any,
    Component: any
};

export default ({ navigation, Component }: RouteProps) => {
    const route = useRoute();

    if (canSeePlayer(route.name)) {
        return (
            <Layout navigation={navigation}>
                <Component navigation={navigation} route={route.name} />
            </Layout>
        )
    }

    return <Component navigation={navigation} route={route.name} />;
} 