import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, RadioGroup, Radio, Card } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { AUTHORIZE_DEEZER, LOGOUT_DEEZER } from '../../reducers/user/constants';
import { SpotifyDeviceObject } from '../../reducers/user/types';

export default () => {
    const { deezer } = useSelector((state: any) => state.user)
    const dispatch = useDispatch();

    const onPressButton = async () => {
        dispatch({ type: AUTHORIZE_DEEZER })
    }

    const onPressDisconnectButton = () => {
        dispatch({ type: LOGOUT_DEEZER })
    }

    const Header = () => (
        <Text category='h6' style={styles.title}>Deezer</Text>
    );

    const Footer = () => (
        <View style={styles.footerContainer}>
            {!(deezer && deezer.accessToken) && (
                <Button 
                    style={styles.spotifyButton}
                    size='small'
                    onPress={onPressButton}
                >
                    LOGIN
                </Button>
            )}
            {deezer && deezer.accessToken && (
                <Button 
                    status='basic'
                    size='small'
                    style={styles.logoutButton}
                    onPress={onPressDisconnectButton}
                >
                    LOGOUT
                </Button>
            )}
        </View>
    );

    return (
        <Card header={Header} footer={Footer} style={styles.card}>
            <Text>
                {deezer.accessToken
                    ? 'Please turn on your Deezer app'
                    : 'Please login to see available devices'
                }
            </Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10
    },
    title: {
        margin: 10
    },
    refreshButton: {
        margin: 10
    },
    logoutButton: {
        marginRight: 10
    },
    spotifyButton: {
        backgroundColor: '#20D760',
        borderColor: '#20D760',
        margin: 10
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});